var generalConf = require('./general');
var passportConf = {};
var logger = require('../configs/log');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    users = require('../schemas/usersSchema');
    // FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    users.User.findById(id, function(err, user) {
        done(err, user);
    }); 
});

passportConf.LocalStrategy = passport.use(new LocalStrategy(
    function(username, password, done) {

        var user = new users.User({'username': username, 'password': password});
  
        user.findByName(function () {})
          .then(function (user) { 
              if (!user) {
                  return done(null, false, { message: 'Incorrect username.' });
              }
              if (!user.validPassword(password)) {
                  return done(null, false, { message: 'Incorrect password.' });
              }

              return done(null, user);
          }, function (err) {
            if (err) { 
                logger.log('error', 'error while validating user ', err);
                return done(err);
            }
          });
    }));



passportConf.session = passport.session();
passportConf.initialize = passport.initialize();

module.exports = passportConf