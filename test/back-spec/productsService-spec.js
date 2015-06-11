(function () {
    'use strict';

    var dbURI    = 'mongodb://localhost/lyb-service-test',
        assert   = require('chai').assert,
        mongoose = require('mongoose'),
        initialData = require('../database/initialData'),
        productsService = require('../../services/productsService'),
        clearDB  = require('mocha-mongoose')(dbURI);

    describe('create a product for store', function () {

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

        it('should create a product', function (done) {
            var productReq = {
                name: 'remera',
                descriptions: 'manga larga',
                price: 23,
                categories: []
            };
            initialData.loadAll()            
                .then(function () {
                    productReq.categories.push(initialData.parentCategory);
                    productReq.categories.push(initialData.childCategory);

                    productsService.create(productReq, initialData.user)
                        .then(function (product) {  
                            assert.isNotNull(product, 'The product is null');
                            assert.equal(product.categories.length, 2);
                            assert.equal(product.name, productReq.name);
                            assert.equal(product.categories[0].title, initialData.parentCategory.title);
                            assert.equal(product.categories[1].title, initialData.childCategory.title);
                            done();
                        });
                });
        }); // it
    }); // describe

} ());