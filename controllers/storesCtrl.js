var router = require('express').Router();
var storesService = require('../services/storesService');

router.post('/create', function(req, res){

	storesService.create(req.body, function(response){
		res.send(response);
	})

})

router.get('/retrieve-all', function(req, res){

	storesService.findAll(function(response){
		res.send(response);
	})
})

router.get('/get-store-by-id', function(req, res){

	var productId = req.query.storeId;

	storesService.getStoreById(productId, function(response){
		res.send(response);
	})

})

router.post('/update', function(req, res){

	var storeToUpdate = req.body;
	storesService.update(storeToUpdate, function(response){
		res.send(response);
	})

})

module.exports = router;