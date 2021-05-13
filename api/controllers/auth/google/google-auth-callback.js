const passport = require('passport')

module.exports = {


  friendlyName: 'Google auth callback',


  description: '',

  inputs: {},


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
    const { }= inputs

    const {
      req, res
    } = this

    const promise = new Promise((resolve, reject) => {
      passport.authenticate('google', { session: false }, (error, user) => {
        if (error) {
          reject(error)
        }

        resolve(user)
      })(req, res)
    })

    let googleUser = null
    try {
      googleUser = await promise.then(data => data)
    } catch (error) {
      sails.log.debug(error)
      return exits.unauthorized()
    }


    const { email } = googleUser
    // Throw error if email is not found
    if (!email) {
      return exits.badRequest('Unable to fetch email information from google.')
    }

    // Find user with email id
    const user = await User.findOne({ email })

    // Throw error if no user is associated with this email
    if (!user) {
      return exits.unauthorized()
    }


    const payload = {
      _id: user._id.toString()
    }

    // Generate a new JWT token
    const token = await sails.helpers.tokenAuth.with({
      type: 'generateToken',
      payload,
    })

    // All done!
    return exits.success({
      message: 'Login successful.',
      token
    })
  }


}
