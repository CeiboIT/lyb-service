(function() {

	'use strict';
	
	var userService = function (entityService) {
		return entityService.getCrudFor('users');
	};	

	angular.module('stores')
		.service('userService', userService);
}());