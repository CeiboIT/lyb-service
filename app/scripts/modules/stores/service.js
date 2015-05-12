(function(){

	'use strict';
	
	var storeService = function (entityService) {
		return entityService.getCrudFor('stores');
	};

	angular.module('stores')
		.service('storeService', storeService);
}());