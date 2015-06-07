var router = require('express').Router();
var productsService = require('../services/productsService');
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

router.get('/', function(req, res){
	var user = req.session.user;
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

module.exports = router;