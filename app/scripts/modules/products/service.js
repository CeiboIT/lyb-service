(function(){

	'use strict'

	var productsService = function($http, apiBaseUrl, messageBoxService) {

		var productsBaseUrl = apiBaseUrl + '/products';

		this.retrieveAll = function() {
			return $http.get(productsBaseUrl + '/retrieve-all')
				.then(function(data){
					return data.data
				})
		};

		this.getProductById = function(productId) {
			return $http.get(productsBaseUrl + '/get-product-by-id?productId='+ productId)
				.then(function(data){
					return data.data
				})
		};

		this.update = function(product) {
			return $http.post(productsBaseUrl + '/update', product)
				.then(function(data){
					if(data.data.err) {
						messageBoxService.showError('An error has ocurred');
					} else {
						messageBoxService.showSuccess('Success saving that')
					}

				})
		}
	}

	angular.module('stores')
		.service('productsService', productsService)
})();