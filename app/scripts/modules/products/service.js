(function() {

	'use strict';

	var countryList = [
      "Afghanistan", "Aland Islands", "Albania", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
    ];

	var imageMixin = function () {
		return {
			removeImage: function (images, image) {
				var index = images.indexOf(image);
				if (index >= 0) {
					images.splice(index, 1);
				}
			}
		};
	};

	var productsService = function (entityService, collectCategoryId, authService) {
		var formatters = {
			preSave: collectCategoryId,
			preUpdate: collectCategoryId },
			service = entityService.getCrudFor('products', formatters);

		service.newEntity = function () {
			return {
				categories: [],
				images: []				
			};
		};
		return service; 
	};
	
	angular.module('stores')
		.value('countryList', countryList)
		.factory('imageMixin', imageMixin)
		.service('productsService', productsService);
}());