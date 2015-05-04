(function(){

	'use strict'

	var usersService = function($http, apiBaseUrl, messageBoxService) {

		var usersBaseUrl = apiBaseUrl + '/users';

		this.retrieveAll = function() {
			return $http.get(usersBaseUrl + '/retrieve-all')
		}

		this.getUserByName = function(username) {
			return $http.get(usersBaseUrl + '/get-user-by-username?username='+username)
				.then(function(data){
					return data.data;
				})
		};

		this.update = function(user) {
			return $http.post(usersBaseUrl + '/update', user)
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
		.service('usersService', usersService)
})();