(function() {
  'use strict';

  /*
   * Modified from https://github.com/elliotf/mocha-mongoose
   */

  var dbTest = 'mongodb://localhost/lyb-service-test';
  var mongoose = require('mongoose');

  mongoose.set('debug', true);

  // ensure the NODE_ENV is set to 'test'
  // this is helpful when you would like to change behavior when testing
  process.env.NODE_ENV = 'test';

  beforeEach(function(done) {

      function clearDB() {
          for (var i in mongoose.connection.collections) {
              mongoose.connection.collections[i].remove(function() {});
          }
          return done();
      }

      if (mongoose.connection.readyState === 0) {
          mongoose.connect(dbTest, function(err) {
              if (err) {
                  throw err;
              }
              return clearDB();
          });
      } else {
          return clearDB();
      }
  });

  afterEach(function(done) {
      mongoose.disconnect();
      return done();
  });
  
}());