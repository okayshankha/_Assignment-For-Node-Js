const ObjectId = require('mongoose').Types.ObjectId

module.exports = {


  friendlyName: 'Delete',


  description: 'Delete user.',


  inputs: {
    userId: { type: 'string', required: true },
  },


  exits: {
    success: {
      responseType: 'success'
    },
    badRequest: {
      responseType: 'badRequest'
    },
    conflict: {
      responseType: 'conflict'
    },
    invalidMongoId: {
      responseType: 'invalidMongoId'
    },
    unauthorized: {
      responseType: 'unauthorized'
    }
  },


  fn: async function (inputs, exits) {

    // Get user id from request
    const {
      userId: _user
    } = inputs

    // Give error if the provided user id is not a valid mongo id
    if (!_user || !ObjectId.isValid(_user)) {
      return exits.invalidMongoId()
    }

    // Try to fetch the user by the mongo id
    const user = await User.getById(_user)

    // Give error if the provided user id does not exists
    if (!user) {
      return exits.invalidMongoId()
    }

    // Soft delete the user
    user.isActive = false

    // Check if valid
    await user.isValid()

    // Save the data
    await user.save()

    // Return proper response
    return exits.success({
      message: 'User delete successful.',
      item: user
    })

  }

}