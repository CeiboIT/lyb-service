(function () {
	'use strict';
	var dbURI    = 'mongodb://localhost/lyb-service-test',
	  	assert   = require('chai').assert,
	  	mongoose = require('mongoose'),
	  	categoryService = require('../../services/categoryService'),
	  	clearDB  = require('mocha-mongoose')(dbURI);

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
			categoryService.create(parentReq, function (response) {
				if (response === 500) {
					console.log('create category > error on response');
					done();
				} 
				console.log(response);
				assert.equal(response.title, parentReq.title);
				done();
			});
		});

		it('should create a child category', function (done) {
			var	req = {
				title: 'Child',
				description: 'Another child category'
			};
			
			function createChild () {
				categoryService.getCategoryByTitle(parentReq.title)
					.then( function(response) {
						console.log('parent _id: '+ response._id);
						req.parent = response._id;
						categoryService.create(req, function (response) {
							if (response === 500) {
								console.log('create category > error on response');
								done();
							} 
							console.log('parent of the child: ' + response.parent);
							assert.equal(response.title, req.title);
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
							});	
						});
					}, function (err) {
						console.log('error ' + err);
					});
			}
			categoryService.create(parentReq, createChild);
		});
	}); // describe
}());		
