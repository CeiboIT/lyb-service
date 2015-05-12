(function(){

	'use strict';
	
	var StoreViewController = function ($templateCache, storeService, entityManagerView) {
		// Controller for the Store view
		var storeController = this;

		var opts = {
	        entityService: storeService,
	        size: 'lg',
	        createTemplate: $templateCache.get('store_create'),
	        listName: 'Stores',
	        scope: storeController,
	        newName: 'Add store',
	        noResultsText: 'No results found'
	    };

		entityManagerView.createFor(opts)
			.then(function(entityManager) {
				storeController.entityManager = entityManager;
			});
	};

	angular.module('stores')
		.run(function(loadTemplate) {
			loadTemplate('/views/stores/list.html');
		})
		.controller('StoreViewController', StoreViewController);
}());