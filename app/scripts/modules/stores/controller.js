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
		.run(function(loadTemplate) {
			loadTemplate('/scripts/modules/stores/create.html', 'store_create');
		})
		.controller('StoreViewController', StoreViewController);
}());