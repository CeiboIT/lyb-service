(function(){

	'use strict';

	// var storesListController = 
	// 	function($log, createOrUpdateDialog, storesList, auxFunctions) {
	// 	var list = this;

	// 	//filters
		
	// 	list.filters = {
	// 		username: null,
	// 		location: null,
	// 		seller: null
	// 	};

	// 	// Filter function
	// 	list.storesFilterFn = function(store) {
	// 	    if(list.filters.name && store.name && (store.name.toLowerCase().indexOf(list.filters.name.toLowerCase()) == -1) ) {
	// 	        return false;
	// 	    }

	// 	    if(list.filters.location && store.location && (store.location.toLowerCase().indexOf(list.filters.location.toLowerCase()) == -1) ) {
	// 	        return false;
	// 	    }

	// 	    return true;
	// 	};

	// 	//Initialization Control
	// 	function init() {
	// 		list.stores = storesList.data;
	// 		// create a set (no duplicates) to populate a select to provide a way to filter stores.
	// 		list.locationsSet = auxFunctions.generateSet(list.stores, 'location');
	// 		list.categoriesSet = auxFunctions.generateSet(list.stores, 'description', 'categories');
	// 		// list.ownersSet = auxFunctions.generateSet(list.stores, 'username', 'owner');
	// 	}

	// 	init();
	// };

	// var storeEditionController = function(store, categories, storesService, auxFunctions) {

	// 	var editor = this;

	// 	editor.store = store;

	// 	editor.update = function(storeToUpdate) {
	// 		storesService.update(storeToUpdate);
	// 	};

	// 	editor.addCategory = function(newCategory) {
	// 		auxFunctions.addElement(editor.store.categories, 
	// 			newCategory, 'description', { notAllowRepeated: true });
	// 	};

	// 	editor.removeCategory = function(category){
	// 		auxFunctions.removeElement(editor.store.categories, category);
	// 	};

	// 	function init () {
	// 		editor.categories = categories;
	// 	}

	// 	init();
	// };
	// var storesCreateController = 
	// 	function ($log, $state, storesService, categoriesService, createOrUpdateController) {
	// 		var storesCreateController = this;
	// 		angular.extend(this, createOrUpdateController({}, {}, storesService));
	// 		storesCreateController.categories = categoriesService.retrieveAll();
	
	// 		storesCreateController.ok = function () {
	// 			storesCreateController.create()
	// 				.then(function (response) {
	// 					$log.debug('store created > ' + response);
	// 					$state.go('stores.list');
	// 				});
	// 		};
	// };

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

	var loadTemplate = function ($http, $templateCache) {
		$http.get('/views/stores/create.html')
    		.then(function (response) {
     		   $templateCache.put('store_create', response.data);
    		});
    };

	angular.module('stores')
		.run(loadTemplate)
		.controller('StoreViewController', StoreViewController);
		// .controller('storesCreateController', storesCreateController)
		// .controller('storesListController', storesListController)
		// .controller('storeEditionController', storeEditionController);
}());