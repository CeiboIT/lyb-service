var express = require('express');
var router = express.Router();

var usersService = require('../services/usersService');
var sellersService = usersService.Sellers;
var buyersService = usersService.Buyers;

router.get('/', function (req, res) {
	usersService.findAll(function (users) {
		res.send(users);
	});
});

router.get('/:id', function (req, res) {
	usersService.getUserById(req.params.id)
		.then(function (user) {
			res.send(user);
		});
});

/**Sellers CRUD ***/
router.post('/sellers', function(req, res){
	sellersService.create(req.body, function(response){
		res.send(response); 
	});
});

router.get('/retrieve-all-sellers', function(req, res){
	sellersService.findAll(function(response){
		res.send(response);
	});
});

/***Buyers CRUD ***/

router.post('/create/buyer', function(req, res){
	buyersService.create(req.body, function(response){
		res.send(response);
	});
});

router.get('/retrieve-all-buyers', function(req, res){
	buyersService.findAll(function(response){
		res.send(response);
	});
});

//Query to all the database
router.get('/retrieve-all', function(req, res){
	usersService.findAll(function(response){
		res.send(response);
	});
});

router.get('/username/:username', function(req, res){
	var username = req.params.username;
	usersService.getUserByName(username)
		.then(function (response){
			res.send(response);
		});
});

router.post('/update', function(req, res){
	var userToUpdate = req.body;
	usersService.update(userToUpdate, function(response){
		res.send(response);
	});
});

router.post('/like-user', function(req, res){
	usersService.likeUser(req.body, function(response){
		res.send(response);
	});
});

router.post('/like-item', function(req, res){
	usersService.likeItem(req.body, function(response){
		res.send(response);
	});
});

module.exports = router;