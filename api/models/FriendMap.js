/**
 * Friend.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


const ObjectId = require('mongoose').Types.ObjectId
module.exports = {


  // createdAt and updatedAt fields will be generated automatically
  schema: {
    _users: [{
      type: ObjectId,
      ref: 'user'
    }],
    isActive: { type: Boolean, default: true },
  },


  /**
   * constructSchema()
   *
   * @param  {Dictionary} schemaDefinedAbove
   * @param  {SailsApp} sails
   * @return {MongooseSchema}
   */
  constructSchema: function (schemaDefinition, sails) {

    // Create the schema
    const schema = new sails.mongoose.Schema(schemaDefinition, {
      autoIndex: true,
      versionKey: false,
      timestamps: true
    })

    // Before Save Hook
    schema.pre('save', (next) => {
      // const friendMap = this

      next()
    })


    /**
     * *************************************************
     *        S T A T I C   M E T H O D S
     * *************************************************
     */

    // Function to check if any document exits with the given id
    schema.static('getById', (_id, projection = {}) => {
      return User.findOne({ _id }, projection)
    })


    // Function to check if any document exits with the given email
    schema.static('getByEmail', (email, projection = {}) => {
      return User.find({ email }, projection)
    })



    /**
     * *************************************************
     *        I N S T A N C E   M E T H O D S
     * *************************************************
     */


    return schema
  },

}


