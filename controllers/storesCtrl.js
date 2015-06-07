var router = require('express').Router();
var storesService = require('../services/storesService');
var logger = require('../configs/log.js');

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.send(401);
}

router.post('/', function(req, res){
	storesService.create(req.body)
		.then(function (response) {
			res.send(response);
		}, function (error) {
			logger.log('error', 'Error creating a store', error);
			res.send(500);
		});
});

router.get('/', isLoggedIn, function(req, res){
	storesService.findAll(function(response){
		res.send(response);
	});
});

router.delete('/:id', function(req, res){
	var storeId = req.params.id;
	storesService.delete(storeId, function(response){
		res.send(response);
	});
});

router.put('/:id', function(req, res){
	var storeToUpdate = req.body;
	storesService.update(storeToUpdate, function(response){
		res.send(response);
	});
});

module.exports = router;