/**
 * request-logger hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */
const morgan = require('morgan')

module.exports = function defineRequestLoggerHook(sails) {

  // Runs when this Sails app loads/lifts.
  let hook
  return {
    initialize: function (cb) {
      hook = this
      return cb()
    },
    defaults: {
      __configKey__: {
        format: 'dev'
      }
    },
    routes: {
      before: {
        '*': function (req, res, next) {
          morgan(sails.config[hook.configKey].format)(req, res, next)
        }
      }
    }
  }
}
