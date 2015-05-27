(function () {
	'use strict';

	describe('create store', function () {
		var mongo = require('../../services/databaseTest');
		// var done = function (response) {
		// 		console.log(response);
		// 	});

		it('should create a store', function (done) {
			var storesService = require('../../services/storesService'),
				req = {
				name: 'Rocket',
				owner: {
					username: 'lalo',
					password: 'landa'
				}
			};
			storesService.create(req, done);
		});
	});
} ());