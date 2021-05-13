const passport = require('passport')

module.exports = {


  friendlyName: 'Google auth',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const { } = inputs

    const {
      req, res
    } = this

    passport.authenticate('google', { scope: ['email', 'profile'] })(req, res)
  }


}
