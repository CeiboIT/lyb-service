(function() {

	'use strict';

	var currencyMixin = function () {
		return {
			currencyList: [
				{ value: 'AUD', name: 'Australian Dollar' },
				{ value: 'BRL', name: 'Brazilian Real' },
				{ value: 'CZK', name: 'Czech Koruna' },
				{ value: 'CAD', name: 'Canadian Dollar'},
				{ value: 'DKK', name: 'Danish Krone' },
				{ value: 'EUR', name: 'Euro' },
				{ value: 'HKD', name: 'Hong Kong Dollar' },
				{ value: 'HUF', name: 'Hungarian Forint' },
				{ value: 'ILS', name: 'Israeli New Sheqel' },
				{ value: 'JPY', name: 'Japanese Yen' },
				{ value: 'MYR', name: 'Malaysian Ringgit' },
				{ value: 'MXN', name: 'Mexican Peso' },
				{ value: 'NOK', name: 'Norwegian Krone' },
				{ value: 'NZD', name: 'New Zealand Dollar' },
				{ value: 'PHP', name: 'Philippine Peso' },
				{ value: 'PLN', name: 'Polish Zloty' },
				{ value: 'GBP', name: 'Pound Sterling' },
				{ value: 'SGD', name: 'Singapore Dollar' },
				{ value: 'SEK', name: 'Swedish Krona' },
				{ value: 'CHF', name: 'Swiss Franc' },
				{ value: 'TWD', name: 'Taiwan New Dollar' },
				{ value: 'TRY', name: 'Turkish Lira' },
				{ value: 'USD', name: 'U.S. Dollar' }]
		};
	};	

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
		.factory('currencyMixin', currencyMixin)
		.factory('imageMixin', imageMixin)
		.service('productsService', productsService);
}());