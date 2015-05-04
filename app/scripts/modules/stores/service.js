(function(){

	'use strict'

	var storesService = function($http, apiBaseUrl, messageBoxService) {

		var storeBaseUrl = apiBaseUrl + '/stores';

		this.retrieveAll = function() {
			return $http.get(storeBaseUrl + '/retrieve-all')
		};

		this.getStoreById = function(storeId) {
			return $http.get(storeBaseUrl + '/get-store-by-id?storeId='+ storeId)
				.then(function(data){
					return data.data
				})
		};

		this.update = function(store) {
			return $http.post(storeBaseUrl + '/update', store)
				.then(function(data){
					if(data.data.err) {
						messageBoxService.showError('An error has ocurred');
					} else {
						messageBoxService.showSuccess('Success saving that')
					}

				})
		};
	}

	angular.module('stores')
		.service('storesService', storesService)
})();