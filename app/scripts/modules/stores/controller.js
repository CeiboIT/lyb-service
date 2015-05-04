(function(){

	'use strict'

	var storesListController = function(storesList, auxFunctions) {
		var list = this;

		//filters
		
		list.filters = {
			username: null,
			location: null,
			seller: null
		}

		//Filter function
		list.storesFilterFn = function(store) {
		    if(list.filters.name && store.name && (store.name.toLowerCase().indexOf(list.filters.name.toLowerCase()) == -1) ) {
		        return false;
		    };

		    if(list.filters.location && store.location && (store.location.toLowerCase().indexOf(list.filters.location.toLowerCase()) == -1) ) {
		        return false;
		    };

		    return true;
		};

		//Initialization Control
		function init() {
			list.stores = storesList.data;
			list.locationsSet = auxFunctions.generateSet(list.stores, "location");
			list.categoriesSet = auxFunctions.generateSet(list.stores, "description", "categories");
			list.ownersSet = auxFunctions.generateSet(list.stores, "username", "owner");
		};

		init();
	};

	var storeEditionController = function(store, categories, storesService, auxFunctions) {

		var editor = this;

		editor.store = store

		editor.update = function(storeToUpdate) {
			storesService.update(storeToUpdate)
		}

		editor.addCategory = function(newCategory) {
			auxFunctions.addElement(editor.store.categories, newCategory, "description", { notAllowRepeated: true });
		};

		editor.removeCategory = function(category){
			auxFunctions.removeElement(editor.store.categories, category);
		};

		 function init () {
			editor.categories = categories;
		};

		init();


	}

	angular.module('stores')
		.controller('storesListController', storesListController)
		.controller('storeEditionController', storeEditionController)

})();