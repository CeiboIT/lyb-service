var passportConf = require('../configs/passport');
var router = require('express').Router();
var User = require('../schemas/usersSchema').User;

router.post('/credentials', function(req, res){
	var user = new User();
	user.findByNameOrEmail(req.body.identification, function(response){
		res.send(response);
	})

})

router.get('/facebook', passportConf.authFacebook);

router.get('/facebook/callback',  passportConf.facebookCallback);

module.exports = router;