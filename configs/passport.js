var generalConf = require('./general')
var passportConf = {}

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../schemas/usersSchema')
  , FacebookStrategy = require('passport-facebook').Strategy;

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passportConf.LocalStrategy = passport.use(new LocalStrategy(
  function(username, password, done) {
    var userData = {
      identification : username,
      password : password
    }

    User.findByName(userData, function(response){
      console.log(response);
    });

   /* User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    });*/
  }
))


passport.use(new FacebookStrategy({
          clientID: '683106581736889',
          clientSecret: '70461a67a2c0230c16bb193f2ff693f4',
          //this must be changed later
          callbackURL: 'http://localhost:3000/auth/facebook/callback',
          passReqToCallback : true
      },
      function(req, accessToken, refreshToken, profile, done) {
      
        console.log('called');

        req.session.fbAccessToken = accessToken;

        var userData = {
                name: profile.displayName,
                //email: profile.emails[0].value,
                username: profile.username,
                provider: 'facebook',
                facebook: profile._json,
                facebook_access_token: accessToken,
                facebook_refresh_token: refreshToken
            };

         return done(null, user);
        
        }
      ));


passportConf.authFacebook = passport.authenticate('facebook')

passportConf.facebookCallback = passport.authenticate('facebook',{ 
  failureRedirect: '/login',
  successRedirect: '/'
})

passportConf.session = passport.session();
passportConf.initialize = passport.initialize();

module.exports = passportConf