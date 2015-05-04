var router = require('express').Router();
var productsService = require('../services/productsService');


router.post('/create', function(req, res){

	productsService.create(req.body, function(response){
		res.send(response);
	})

})

//router.post('/update')
//router.post('/find')

router.get('/retrieve-all', function(req, res){

	productsService.findAll(function(response){
		res.send(response);
	})

})

router.get('/get-product-by-id', function(req, res){

	var productId = req.query.productId;

	productsService.getProductById(productId, function(response){
		res.send(response);
	})

})

router.post('/update', function(req, res){

	var productToUpdate = req.body;
	productsService.update(productToUpdate, function(response){
		res.send(response);
	})

})



router.post('/find-by-name', function(req, res){

	productsService.findProductByName(req.body.productName, function(response){
		res.send(response);
	})

})


//router.post('/delete')


module.exports = router;