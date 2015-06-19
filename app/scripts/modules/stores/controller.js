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
	        filterFn = function (entity) {
	    		var name = true,
	    			location = true;

	    		if (storeController.filters && storeController.filters.name) {
	    			name = entity.name.match(new RegExp(storeController.filters.name, 'i'));
	    		}
	    		if (storeController.filters && storeController.filters.location) {
	    			name = entity.location.match(new RegExp(storeController.filters.location, 'i'));
	    		}
	    		return name && location;
	    	};

			entityManagerView.createFor(opts)
				.then(function(entityManager) {
					storeController.entityManager = entityManager;
					storeController.entityManager.filterFn = filterFn;
				});
	};

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