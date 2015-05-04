(function(){

	'use strict'

	var statsService = function($http, apiBaseUrl) {

		var statsBaseUrl = apiBaseUrl + '/statistics';

		this.getSystemStats = function() {
			return $http.get(statsBaseUrl + '/general')
				.then(function(data){
					return data.data
				})
		}
	}

	angular.module('statistics')
		.service('statsService', statsService)
})();