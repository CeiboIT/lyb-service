// var passportConf = require('../configs/passport');
var router = require('express').Router();
var User = require('../schemas/usersSchema').User;
var passport = require('passport');
var logger = require('../configs/log');

router.post('/credentials', function(req, res){
	var user = new User();
	user.findByNameOrEmail(req.body.identification, function(response){
		res.send(response);
	});
});

router.get('/loggedin', function(req, res) { 
	res.send(req.isAuthenticated() ? req.user : '0'); 
});

router.post('/login', passport.authenticate('local'), function (req, res) {
	req.session.user = req.user;
	res.send({ identity: req.user });
});

router.post('/logout', function(req, res) {
    req.logout();
    res.send(200);
});

// Facebook

router.get('/facebook', passport.authenticate('facebook-token', function (req, res) {
	res.send(req.user? req.user : 401);
}));

router.get('/facebook/callback',
        passport.authenticate('facebook'),
        function (req, res) {
        	logger.log('debug', 'logged user', req.user);
        	req.session.user = req.user;
			res.send({ identity: req.user });
        });

module.exports = router;