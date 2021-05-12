var sails = require('sails');
var _ = require('lodash');


// Before running any tests...
before(function (done) {

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(10000);

  require('dotenv').config();

  process.env.NODE_ENV = 'test';

  // Lift Sails and start the server
  sails.lift({}, (err) => done(err, sails));

});

// After all tests have finished...
after(async () => {

  // Drop all collections
  const models = Object.keys(sails.models);
  for (let index = 0; index < models.length; index++) {
    const Model = sails.models[models[index]];
    await Model.deleteMany();
  }


  if (sails && _.isFunction(sails.lower)) {
    await sails.lower();
  }

});
