(function(){

	'use strict';
	
	var StoreViewController = 
		function ($templateCache, storeService, categoryService, categoryCreateOrUpdateMixin, entityManagerView) {
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
		    };	

			entityManagerView.createFor(opts)
				.then(function(entityManager) {
					storeController.entityManager = entityManager;
				});
	};
	// StoreViewController.$inject = ['$templateCache', 'storeService', 'categoryService', 'categoryCreateOrUpdateMixin', 'entityManagerView'];

	angular.module('stores')
		.run(function(loadTemplate) {
			loadTemplate('/views/stores/create.html', 'store_create');
		})
		.controller('StoreViewController', StoreViewController);
}());