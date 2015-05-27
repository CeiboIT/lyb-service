(function(){

	'use strict';
	
	var StoreViewController = 
		function ($templateCache, authService, storeService, categoryService, categoryCreateOrUpdateMixin, entityManagerView) {
		// Controller for the Store view
		var storeController = this,
			opts = {
	      		entityService: storeService,
		        size: 'lg',
		        createTemplate: $templateCache.get('store_create'),
		        listName: 'Stores',
		        createOrUpdateMixins: [categoryCreateOrUpdateMixin()],
		        newName: 'Add store',
		        noResultsText: 'No results found',
		        confirmText: 'Are you sure?'
		    },
	    	goToStore = function (store) {
		    	authService.loginAsSeller(store);
			};

			entityManagerView.createFor(opts)
				.then(function(entityManager) {
					storeController.entityManager = entityManager;
					storeController.goToStore = goToStore;
				});
	};
	// StoreViewController.$inject = ['$templateCache', 'storeService', 'categoryService', 'categoryCreateOrUpdateMixin', 'entityManagerView'];

	angular.module('stores')
		.config(['$stateProvider', function($stateProvider) {
	    	$stateProvider.state('stores.list', {
	    	  url: '/list',
	    	  templateUrl: '/scripts/modules/stores/list.html',
	    	  controller: 'StoreViewController as entityController'
	    	});
		}])
		.factory('authService', ['$window', '$state', function ($window, $state) {
			var auth = {
				loginAsSeller: function (store) { // Mock function to demo. Need to be removed
					var seller = {
						role: 'seller',
						username: 'john_doe_seller',
						store: store
					};
					$window.sessionStorage.setItem('user', JSON.stringify(seller));
					$state.go('products.list',{},{reload: true});
				}
			};
			return auth;
		}])
		.run(function(loadTemplate) {
			loadTemplate('/scripts/modules/stores/create.html', 'store_create');
		})
		.controller('StoreViewController', StoreViewController);
}());