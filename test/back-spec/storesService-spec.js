(function () {
	'use strict';
	var dbURI    = 'mongodb://localhost/lyb-service-test',
	  	assert   = require('chai').assert,
	  	mongoose = require('mongoose'),
	  	storesService = require('../../services/storesService'),
	  	clearDB  = require('mocha-mongoose')(dbURI);

	describe('create store', function () {

		beforeEach(function (done) {
			if (mongoose.connection.db) {
				return done();
			}
    		mongoose.connect(dbURI, done);
		});	

		it('should create a store', function (done) {
			var	req = {
					name: 'Rocket',
					owner: {
						username: 'lalo',
						password: 'landa'
				}
			};
			
			function assertStore(store) {
				assert.isNotNull(store);
				assert.equal(store.name, req.name, 'Store name is wrong');
				// assert.isNotNull(store.owner);
				// assert.equal(store.owner.username, req.owner.username, 'Owner username is wrong');
				// assert.notEqual(store.owner.password, req.owner.password, 'Owner password is not encoded');
				done();
			}

			storesService.create(req, assertStore);
		});
	});
} ());