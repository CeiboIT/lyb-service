var router = require('express').Router();
var categoryService = require('../services/categoryService');
var logger = require('../configs/log.js');

router.post('/', function(req, res){
	categoryService.create(req.body)
		.then( function(response){
			res.send(response);
		}, function (err) {
			logger.log('error', err);
			res.send(500);
		});
});

router.get('/', function(req, res){
	categoryService.findAll(function(response){
		res.send(response);
	});
});

router.get('/parents', function(req, res){
	categoryService.findAllParents(function(response){
		res.send(response);
	});
});

router.put('/:id', function(req, res){
	categoryService.update(req.body, function(response){
		res.send(response);
	});
});

router.get('/get-category-by-id', function(req, res){

	var categoryId = req.query.categoryId;

	categoryService.getCategoryById(categoryId, function(response){
		res.send(response);
	});

});

//Needs to determine the logic of a deletion and if is possible to delete a category

module.exports = router;