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

	var productsService = function (entityService) {
		var service = entityService.getCrudFor('products');

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