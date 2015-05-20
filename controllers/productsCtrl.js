var router = require('express').Router();
var productsService = require('../services/productsService');


router.post('/', function(req, res){
	productsService.create(req.body, function(response){
		res.send(response);
	});
});

router.delete('/:id', function(req, res){
	var productId = req.params.id;
	productsService.delete(productId, function(response){
		res.send(response);
	});
});

router.get('/', function(req, res){
	productsService.findAll(function(response){
		res.send(response);
	});
});

router.get('/:id', function(req, res){
	var productId = req.params.id;
	productsService.getProductById(productId, function(response){
		res.send(response);
	});
});

router.put('/:id', function(req, res){
	var productToUpdate = req.body;
	productsService.update(productToUpdate, function(response){
		res.send(response);
	});
});

router.post('/find-by-name', function(req, res){
	productsService.findProductByName(req.body.productName, function(response){
		res.send(response);
	});
});

module.exports = router;