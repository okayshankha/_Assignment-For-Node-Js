const moment = require('moment')

module.exports = {


  friendlyName: 'Register',


  description: 'Register auth.',

  inputs: {
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
      name,
      dob,
      address,
      description
    } = inputs

    const dateOfBirth = moment(dob, 'YYYY-MM-DD').toDate()

    // Try to create a user
    const user = new User({
      name,
      dob,
      address,
      description
    })

    // Check if valid
    await user.isValid()

    // Save the data
    await user.save()

    // Return proper response
    return exits.success({
      statusCodeToSet: 201,
      message: 'User create successful.',
      item: user
    })
  }


}
