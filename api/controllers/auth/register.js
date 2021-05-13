module.exports = {


  friendlyName: 'Register',


  description: 'Register auth.',

  inputs: {
    email: { type: 'string', required: true },
    name: { type: 'string', required: true },
    dob: { type: 'string', required: true },
    address: { type: 'string' },
    description: { type: 'string' },
    latitude: { type: 'number', required: true },
    longitude: { type: 'number', required: true }
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
      email,
      name,
      dob,
      address,
      description,
      latitude,
      longitude
    } = inputs


    // Check if the data format is correct
    const isValidDate = await sails.helpers.dateFormatChecker.with({ date: dob, inPast: true })
    if (!isValidDate) {
      return exits.badRequest({
        statusCodeToSet: 422,
        errors: [`Invalid date (expected Format: "${sails.config.custom.DEFAULT_DATE_FORMAT}") and should be in past.`]
      })
    }

    // Try to create a user
    const user = new User({
      email,
      name,
      dob,
      address,
      description,
      latitude,
      longitude
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
