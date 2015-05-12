(function(){

	'use strict';
	
	var categoryService = function (entityService) {
		return entityService.getCrudFor('categories');
	};

	angular.module('categories')
		.factory('categoryService', categoryService);
}());