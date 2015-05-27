(function () {
	'use strict';
	var userSchema = require('../../schemas/usersSchema');
	var mongoose = require('mongoose');

	describe('findByName', function () {
		it('should find a User by a given username', function () {
			var userModel = mongoose.model('User');
			var query = userModel.findOne({username: 'lalo'});
			query.exec(function (err, response) {
				console.log(err);
				console.log(response);
			});
		});
	});

}());