var router = require('express').Router();
var categoryService = require('../services/categoryService');
var logger = require('../configs/log.js');

router.post('/', function(req, res){
	categoryService.create(req.body)
		.then(function (response){
			res.send(response);
		}, function (err) {
			logger.log('error', err);
			res.send(500);
		});
});

router.get('/', function (req, res) {
	categoryService.findAll()
		.then(function (response) {
			res.send(response);
		}, function (error) {
			logger.log('error', 'Error retrieving all categories', error);
		});
});

router.get('/parents', function (req, res) {
	categoryService.getParents()
		.then(function (response) {
			res.send(response);
		}, function (error) {
			logger.log('error', 'Error retrieving parents', error);
		});
});

router.get('/ordered', function (req, res) {
	categoryService.ordered()
		.then(function (response) {
			res.send(response);
		}, function (error) {
			logger.log('error', 'Error retrieving parents', error);
		});
});

router.put('/:id', function(req, res){
	categoryService.update(req.body, function(response){
		res.send(response);
	});
});

//Needs to determine the logic of a deletion and if is possible to delete a category

module.exports = router;