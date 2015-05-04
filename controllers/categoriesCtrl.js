var router = require('express').Router();
var categoryService = require('../services/categoryService');

router.post('/create', function(req, res){
	categoryService.create(req.body, function(response){
		res.send(response);
	})
});

router.get('/retrieve-all', function(req, res){

	categoryService.findAll(function(response){
		res.send(response);
	})

})

router.post('/update', function(req, res){
	categoryService.update(req.body, function(response){
		res.send(response);
	})
});

router.get('/get-category-by-id', function(req, res){

	var categoryId = req.query.categoryId;

	categoryService.getCategoryById(categoryId, function(response){
		res.send(response);
	})

})




//Needs to determine the logic of a deletion and if is possible to delete a category

module.exports = router;