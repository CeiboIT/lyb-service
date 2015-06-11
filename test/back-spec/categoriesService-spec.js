(function () {
	'use strict';
	var dbURI    = 'mongodb://localhost/lyb-service-test',
	  	assert   = require('chai').assert,
	  	mongoose = require('mongoose'),
	  	categoryService = require('../../services/categoryService'),
        initialData = require('../database/initialData'),
        clearDB  = require('mocha-mongoose')(dbURI);


	describe('create categories', function () {
		var	parentReq = {
				title: 'Padre',
				description: 'Another parent category'
			},
			childCategoryReq = {
				title: 'Child',
				description: 'Another child category'
			};

		beforeEach(function (done) {
			if (mongoose.connection.db) {
				return done();
			}
    		mongoose.connect(dbURI, done);
		});	

 		afterEach(function (done) {
            clearDB(function (err) {
                if (err) {
                    return done(err);
                }
                done();
            });
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

		// Embedded document way
		// it('should create a child category', function (done) {
		// 	categoryService.create(parentReq)
		// 		.then(function (parentCategory) {
		// 			parentCategory.subCategories = [childCategoryReq];
		// 			parentCategory.save()
		// 				.then(function (parentCategory) {
		// 						assert.equal(parentCategory.title, parentReq.title);
		// 						assert.equal(parentCategory.subCategories.length, 1);
		// 						assert.equal(parentCategory.subCategories[0].title, childCategoryReq.title);
		// 						done();
		// 					}, function () {
		// 						console.log('create category > error on response');
		// 						done();
		// 					});
		// 		}, function (err) {
		// 			console.log('error ' + err);
		// 			done();
		// 		});
		// }); // it

		it('should create a child category', function (done) {
			categoryService.create(parentReq)
				.then(function (parentCategory) {
					console.log('parent _id: '+ parentCategory._id);
					childCategoryReq.parent = parentCategory;
					categoryService.create(childCategoryReq)
						.then(function (childCategory) {
								assert.equal(childCategory.title, childCategoryReq.title);
								assert.equal(childCategory.parent.title, childCategoryReq.parent.title);
								done();
							}, function () {
								console.log('create category > error on response');
								done();
							});
				}, function (err) {
					console.log('error ' + err);
					done();
				});
		}); // it

		it('find all', function (done) {
			initialData.loadAll()
				.then(function () {
					categoryService.findAll()
						.then(function (response) {
							assert.isNotNull(response);
							assert.equal(response.length, 1);
							done();
						});
				});
		}); // it

		it('find parent', function (done) {
			categoryService.create(parentReq)
				.then(function (parentCategory) {
					childCategoryReq.parent = parentCategory;
					categoryService.create(childCategoryReq)
						.then(function () {
							categoryService.getParents()
								.then(function (parents) {
									assert.isNotNull(parents);
									assert.equal(parents.length, 1);
									assert.equal(parents[0].title, parentReq.title);
									done();
								});
						});
				});			
		}); // it


	}); // describe
}());		
