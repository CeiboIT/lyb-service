(function(){

	'use strict'

	var categoriesService = function($http, apiBaseUrl) {

		var categoriesBaseUrl = apiBaseUrl + '/categories';

		this.retrieveAll = function() {
			return $http.get(categoriesBaseUrl + '/retrieve-all')
				.then(function(data){
					return data.data;
				})
		}

		this.createNewCategory = function(description) {
			return $http.post(categoriesBaseUrl + '/create', description)
		}

		this.getCategoryById = function(categoryId) {
			return $http.get(categoriesBaseUrl + '/get-category-by-id?categoryId='+ categoryId)
				.then(function(data){
					return data.data
				})
		}
	}

	angular.module('categories')
		.service('categoriesService', categoriesService)
})();