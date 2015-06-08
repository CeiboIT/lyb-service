(function () {
	'use strict';
	var dbURI    = 'mongodb://localhost/lyb-service-test',
	  	assert   = require('chai').assert,
	  	mongoose = require('mongoose'),
	  	categoryService = require('../../services/categoryService');

	describe('create categories', function () {
		var	parentReq = {
				title: 'Padre',
				description: 'Another parent category'
			};

		beforeEach(function (done) {
			if (mongoose.connection.db) {
				return done();
			}
    		mongoose.connect(dbURI, done);
		});	

		it('should create a parent category', function (done) {
			categoryService.create(parentReq)
				.then(function (response) {
						console.log(response);
						assert.equal(response.title, parentReq.title);
						done();
				}, function (error) {
					console.log('create category > error on response ', error);
					done();
				});
		}); // it

		it('should create a child category', function (done) {
			var	req = {
				title: 'Child',
				description: 'Another child category'
			};
			function createChild () {
				categoryService.getCategoryByTitle(parentReq.title)
					.then(function(response) {
						console.log('parent _id: '+ response._id);
						req.parent = response._id;
						categoryService.create(req)
							.then(function (response) {
									console.log('parent of the child: ' + response.parent);
									assert.equal(response.title, req.title);
									done();
								}, function () {
									console.log('create category > error on response');
									done();
								});
					}, function (err) {
						console.log('error ' + err);
					});
			}
			categoryService.create(parentReq, createChild);
		}); // it

		it('find all parents', function (done) {
			var	req = {
				title: 'Child',
				description: 'Another child category'
			};
			
			function createChild () {
				categoryService.getCategoryByTitle(parentReq.title)
					.then( function(response) {
						req.parent = response._id;
						categoryService.create(req, function () {
							categoryService.findAllParents(function (response) {
								assert.notNull(response);
								done();
							});	
						});
					}, function (err) {
						console.log('error ' + err);
						done();
					});
			}
			categoryService.create(parentReq, createChild);
		});
	}); // describe
}());		
