/**
 * Module dependencies
 */

var _ = require('lodash')
var mongoose = require('mongoose')



/**
 * @param  {SailsApp} sails
 * @return {Dictionary}
 */
module.exports = function (sails) {

  /**
   * Hook definition
   */
  return {
    /**
     * defaults
     *
     * The implicit configuration defaults merged into `sails.config` by this hook.
     *
     * @type {Dictionary}
     */
    defaults: {

      globals: {
        models: true
      },

      // Mongoose-specific config
      mongoose: {
        uri: 'mongodb://localhost/my_sails_app',
        connectionOpts: {}
      }

    },


    /**
     * configure()
     *
     * @type {Function}
     */
    configure: function () {

      // Validate `sails.config.globals.models`
      if (_.isObject(sails.config.globals) && !_.isBoolean(sails.config.globals.models)) {
        throw new Error(
          'If provided, `sails.config.globals.models` must be either `true` or `false`.\n' +
          'If `true`, instantiated Mongoose models will be exposed as global variables.'
        )
      }

      // Validate `sails.config.mongoose.uri`
      if (!_.isString(sails.config.mongoose.uri)) {
        throw new Error(
          'Expected Mongo connection URI (a string) to be provided as `sails.config.mongoose.uri`, but the provided Mongo URI is invalid.\n' +
          'See https://docs.mongodb.org/manual/reference/connection-string/ for help.'
        )
      }

      // Validate `sails.config.mongoose.connectionOpts`
      if (!_.isObject(sails.config.mongoose.connectionOpts) || _.isArray(sails.config.mongoose.connectionOpts)) {
        throw new Error(
          'If provided, `sails.config.mongoose.connectionOpts` must be a dictionary of additional options to pass to Mongoose.\n' +
          'See http://mongoosejs.com/docs/connections.html for a full list of available options.'
        )
      }

    },



    /**
     * initialize()
     *
     * @param  {Function} _cb
     */
    initialize: function (_cb) {

      // Wrap the actual `initialize` callback with a function which uses a flag to track whether or not we've already called our callback.
      var hasAlreadyTriggeredCallback
      var cb = function (err) {
        if (hasAlreadyTriggeredCallback) {
          if (err) {
            // If the callback is being triggered again with an error, we have no choice but to throw and crash the server.
            sails.log.error('`initialize` function of Mongoose hook (ORM hook override) was called again, but that should never happen more than once!')
            sails.log.error('Proceeding to crash the server... (this is to avoid creating any weird race conditions that could potentially mess up your data)')
            throw err
          }
          else { sails.log.warn('`initialize` function of Mongoose hook (ORM hook override) was called again, but that should never happen more than once!') }
          return
        }
        hasAlreadyTriggeredCallback = true
        return _cb(err)
      }

      try {
        // Expose `sails.mongoose`.
        sails.mongoose = mongoose

        // Connect to the configured database using Mongoose.
        sails.mongoose.connect(sails.config.mongoose.uri, sails.config.mongoose.connectionOpts)
        var dbConnection = sails.mongoose.connection
        dbConnection.once('error', (err) => {

          // Handle cases where Mongoose emits an error event without sending an Error instance as the event data.
          if (!err) {
            throw new Error('Unrecognized Mongoose connection error (connection emitted error event with no data)')
          }
          else if (!_.isObject(err) || !_.isString(err.message)) {
            throw new Error('Unrecognized Mongoose connection error (connection emitted error event with non-Error data: `' + err + '`)')
          }

          // If this is an ECONNREFUSED error, then there is probably something going on with the database config.
          if (err.message.match(/ECONNREFUSED/)) {
            var troubleshootingMsg = 'Could not connect to Mongo database (@`' + sails.config.mongoose.uri + '`).\nMake sure the Mongo database at that connection URI is running and that the connection URI is correct.\nPlease also verify that any additional connection options (`sails.config.mongoose.connectionOpts`) are valid.\nFor help, see http://mongoosejs.com/docs/connections.html.'
            err.message = troubleshootingMsg
            err.stack = troubleshootingMsg + '\n\nError details:\n' + err.stack + '\n'
            err.code = 'ECONNREFUSED'
            return cb(err)
          }

          return cb(err)
        })


        // We also listen for the `open` event, which indicates that we were able to successfully connect to the database.
        dbConnection.once('open', () => {

          // Load model definitions using the module loader.
          sails.log.verbose('Loading the app\'s models from `%s`...', sails.config.paths.models)
          sails.modules.loadModels(function modulesLoaded(err, modules) {
            if (err) {
              return cb(err)
            }

            try {

              // Instantiate Mongoose schemas for each model definition (running custom `constructSchema` functions if provided)
              var schemas = _.reduce(modules, (memo, def, identity) => {

                // Validate `schema` from model def (if omitted, default it to `{}`)
                if (_.isUndefined(def.schema)) {
                  def.schema = {}
                }
                if (!_.isObject(def.schema) || _.isArray(def.schema)) {
                  throw new Error('Invalid `schema` provided in model (`' + identity + '`).  If provided, `schema` must be a dictionary.')
                }

                // If no `constructSchema` interceptor function was provided, just new up a Mongoose Schema by passing in `schema` from the model def.
                if (_.isUndefined(def.constructSchema)) {
                  memo[identity] = new sails.mongoose.Schema(def.schema)
                }
                // If `constructSchema` interceptor function WAS provided, run it to get the Schema instance.
                else if (_.isFunction(def.constructSchema)) {
                  try {
                    memo[identity] = def.constructSchema(def.schema, sails)
                  }
                  catch (e) {
                    e.message = 'Encountered an error when running `constructSchema` interceptor provided for model (`' + identity + '`). Details:\n' + e.message
                    e.stack = 'Encountered an error when running `constructSchema` interceptor provided for model (`' + identity + '`). Details:\n' + e.stack
                    throw e
                  }
                }
                else {
                  throw new Error('Invalid `constructSchema` interceptor provided in model (`' + identity + '`).  If provided, `constructSchema` must be a function.')
                }

                // Validation code set and status code set
                memo[identity].method('isValid', async function () {
                  try {
                    await this.validate()
                    return true
                  } catch (error) {
                    error.code = 'E_MISSING_OR_INVALID_PARAMS'
                    error.statusCodeToSet = 422
                    error.errors = [error.message]
                    throw error
                  }
                })

                return memo
              }, {})

              // Now generate Model constructors from those schemas and expose references to them as `sails.models[identity]`.
              sails.models = _.reduce(schemas, (memo, mongooseSchemaInstance, identity) => {
                memo[identity] = sails.mongoose.model(identity, mongooseSchemaInstance)
                memo[identity].globalId = modules[identity].globalId
                memo[identity].identity = identity
                return memo
              }, {})


              // If configured to do so, also expose instantiated models as global variables.
              if (_.isObject(sails.config.globals) && sails.config.globals.models) {
                _.each(sails.models, function eachInstantiatedModel(Model, identity) {
                  // Expose the Model as a global variable.
                  global[Model.globalId] = Model

                  sails.log.silly(identity)
                })
              }

              // All Done.
              return cb()
            }
            catch (e) {
              return cb(e)
            }
          })
        })
      }
      catch (e) {
        return cb(e)
      }
    },
  }
}
