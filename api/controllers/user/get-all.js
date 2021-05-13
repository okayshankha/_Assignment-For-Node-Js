module.exports = {


  friendlyName: 'Get all',


  description: 'Get all users',


  inputs: {

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

    // Fetch all users
    const users = await User.find({ isActive: true })

    // Return proper response
    return exits.success({
      message: 'Users fetch successful.',
      items: users
    })

  }


}
