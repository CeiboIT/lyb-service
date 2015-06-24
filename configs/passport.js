var generalConf = require('./general');
var passportConf = {};
var logger = require('../configs/log');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var users = require('../schemas/usersSchema');
var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token').Strategy;


passportConf.loginSocialUser = function (user) {
    return users.User.findById(user._id)
        .then( function (savedUser) {
            savedUser.lastLogin = new Date();
            return savedUser.save();
        });        
};

passportConf.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return passport.authenticate('facebook-token') (req, res, next);
};

passportConf.authenticate = function (req, res, next) {
    return passportConf.facebookToken(req, res, next);
};

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    users.User.findById(id, function(err, user) {
        done(err, user);
    }); 
});

passportConf.getUser = function (req) {
    if (req.user) {
        return req.user;
    }
    if (req.session.user) {
        return req.session.user;
    }
    return {};
};

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


// Facebook

var createFacebookUser = function (profile, token) {
    // if there is no user found with that facebook id, create them
    var newUser = new users.Buyer();
    // set all of the facebook information in our user model
    newUser.facebook.id    = profile.id; // set the users facebook id                   
    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
    return newUser;
};

passport.use(new FacebookTokenStrategy({
        clientID: '822272877864083',
        clientSecret: '3ce32e04717652e6174aae47d578cdfd' 
    },
    function(token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
            // find the user in the database based on their facebook id
            users.Buyer.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err) {
                    return done(err);
                }
                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    var newUser = createFacebookUser(profile, token);
                    newUser.save(function(err) {
                        if (err) {
                            throw err;
                        }
                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }
            });
        });
    })
);

passportConf.session = passport.session();
passportConf.initialize = passport.initialize();

module.exports = passportConf;