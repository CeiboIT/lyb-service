var router = require('express').Router();
var productsService = require('../services/productsService');
var passportConf = require('../configs/passport');
var passport = require('passport');
var logger = require('../configs/log.js');


router.post('/', function(req, res) {
	var user = req.session.user;
	productsService.create(req.body, user)
		.then(function(product) {
			res.send(product);
		}, function(err) {
			logger.log('error', err);
			res.send(500);
		});
});

router.delete('/:id', function(req, res){
	var productId = req.params.id;
	productsService.delete(productId, function(response){
		res.send(response);
	});
});

router.get('/', 
	function(req, res){
		var user = passportConf.getUser(req);
		productsService.findAll(user)
			.then(function(products) {
				res.send(products);
			}, function(err) {
				logger.log('err', err);
				res.send(500);
			});
	});

router.get('/:id', function(req, res){
	var productId = req.params.id;
	productsService.getProductById(productId)
		.then(function(product) {
			res.send(product);
		}, function(err) {
			logger.log('err', err);
			res.send(500);
		});
	// productsService.getProductById(productId, function(response){
	// 	res.send(response);
	// });
});

router.put('/:id', function(req, res){
	var productToUpdate = req.body;
	productsService.update(productToUpdate, function(response){
		res.send(response);
	});
});

router.post('/:id/like', passportConf.isAuthenticated, function(req, res){
	var user = passportConf.getUser(req);
	productsService.like(req.params.id, user)
		.then(function () {
			res.send(200);			
		});
});

module.exports = router;