(function(){

	'use strict';
	
	var StoreViewController = 
		function ($templateCache, storeService, storeCreateOrUpdateMixin, entityManagerView) {
		// Controller for the Store view
		var storeController = this,
			opts = {
	      		entityService: storeService,
		        size: 'lg',
		        createTemplate: $templateCache.get('store_create'),
		        listName: 'Stores',
		        createOrUpdateMixin: storeCreateOrUpdateMixin,
		        newName: 'Add store',
		        noResultsText: 'No results found',
		        confirmText: 'Are you sure?'
		    };	
			entityManagerView.createFor(opts)
				.then(function(entityManager) {
					storeController.entityManager = entityManager;
				});
	};
	StoreViewController.$inject = ['$templateCache', 'storeService', 'storeCreateOrUpdateMixin', 'entityManagerView'];

	var storeCreateOrUpdateMixin = function ($log, categoryService) {
		var mixin = {
			addCategory: function (store, category) {
				$log.debug('storeCreateOrUpdateMixin > addCategory > adding ' + category.title + ' to ' + store.name);
				// check if the category is not already added
				if (store.categories.indexOf(category) < 0) {
					store.categories.push(category);
				}
			},
			removeCategory: function (store, categoryId) {
				$log.debug('storeCreateOrUpdateMixin > removeCategory > removing ' + categoryId + ' to ' + store.name);
				var index = store.categories.indexOf(categoryId);
				if (index >= 0) {
					store.categories.splice(index, 1);
				}
			}
		};
		categoryService.getAll()
	    	.then(function(response) {
    			mixin.categories = response;
			}); 
		return mixin;
	};

	angular.module('stores')
		.run(function(loadTemplate) {
			loadTemplate('/views/stores/create.html', 'store_create');
		})
		.factory('storeCreateOrUpdateMixin', storeCreateOrUpdateMixin)
		.controller('StoreViewController', StoreViewController);
}());