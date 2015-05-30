(function () {
    'use strict';

    var dbURI    = 'mongodb://localhost/lyb-service-test',
        assert   = require('chai').assert,
        mongoose = require('mongoose'),
        productsService = require('../../services/productsService'),
        storesService = require('../../services/storesService'),
        clearDB  = require('mocha-mongoose')(dbURI);

    describe('create a product for store', function () {

        var addStore = function (callback) {
            var req = {
                    name: 'Rocket',
                    owner: {
                        username: 'lalo',
                        password: 'landa'
                }
            };
            storesService.create(req, callback);
        };

        it('should create a store', function (done) {
            var req = {
                name: 'remera',
                descriptions: 'manga larga',
                price: 23
            };

            addStore(function (store) {
                if (store) {
                    req.store = store.id;
                    productsService.create(req)
                        .then(function (product) {
                            assert.notNull(product, 'The product is null');
                            done();
                        });
                }
            });
        });
    });
} ());