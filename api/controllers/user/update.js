const ObjectId = require('mongoose').Types.ObjectId
const moment = require('moment')

module.exports = {


  friendlyName: 'Update',


  description: 'Update user.',


  inputs: {
    userId: { type: 'string', required: true },
    name: { type: 'string', required: true },
    dob: { type: 'string', required: true },
    address: { type: 'string' },
    description: { type: 'string' }
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
    unauthorized: {
      responseType: 'unauthorized'
    }
  },


  fn: async function (inputs, exits) {

    // Get the request payloads
    const {
      userId: _user,
      name,
      dob,
      address,
      description
    } = inputs

    const dateOfBirth = moment(dob, 'YYYY-MM-DD').toDate()

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

    // Try to update the user data
    user.name = name
    user.dob = dob
    user.address = address
    user.description = description

    // Check if valid
    await user.isValid()

    // Save the data
    await user.save()

    // Return proper response
    return exits.success({
      message: 'User update successful.',
      item: user
    })
  }


}
