'use strict'

var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth2').Strategy

//var verifyHandler = function(req, token, tokenSecret, profile, done) {
var verifyHandler = function (accessToken, refreshToken, profile, cb, done) {

  var data = {
    id: cb.id,
    name: cb.displayName,
    email: cb.emails[0].value,
    emailVerified: cb.emails[0].verified
  }

  return done(null, data)
}

passport.use(new GoogleStrategy({
  clientID: '413588803788-18t53j60kmomp9h7b6tatg7t1sq6n0j7.apps.googleusercontent.com',
  clientSecret: 'M-8xeSU62hWrZI-RSm6FIFFy',
  callbackURL: '/api/v1/auth/google/callback',
  passReqToCallback: true
}, verifyHandler))