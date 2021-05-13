var sails = require('sails')
var _ = require('lodash')


// Before running any tests...
before(function (done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(10000)

  // Load env variables
  require('dotenv').config()

  // Set test env
  process.env.NODE_ENV = 'test'
  process.env.PORT = 10000

  // Lift Sails and start the server
  sails.lift({}, (err) => done(err, sails))

})

// After all tests have finished...
after(async () => {

  // Drop all collections
  const models = Object.keys(sails.models)
  for (let index = 0; index < models.length; index++) {
    const Model = sails.models[models[index]]
    await Model.deleteMany()
  }


  if (sails && _.isFunction(sails.lower)) {
    await sails.lower()
  }

})
