(function(){

	'use strict'

	var productsListController = function(productsList, auxFunctions) {
		var list = this;

		//filters
		
		list.filters = {
			username: null,
			category: null,
			seller: null
		}

		//Filter function
		list.productsFilterFn = function(product) {
		    if(list.filters.name && product.name && (product.name.toLowerCase().indexOf(list.filters.name.toLowerCase()) == -1) ) {
		        return false;
		    };

		    if(list.filters.seller && product.name && (product.seller.username.toLowerCase().indexOf(list.filters.seller.toLowerCase()) == -1) ) {
		        return false;
		    };

		    if(list.filters.category && product.categories) {
		    	var found;
		    	for (var i = 0; i < product.categories.length; i++) {
		    		if(product.categories[i].description == list.filters.category) {
		    			found = true;
		    		}
		    	};

		    	if(!found) {
		    		return false;
		    	}
		    } 

		    return true;
		};

		//Initialization Control
		function init() {
			list.products = productsList;
			list.locationsSet = auxFunctions.generateSet(list.products, "location");
			list.categoriesSet = auxFunctions.generateSet(list.products, "description", "categories");
			list.sellersSet = auxFunctions.generateSet(list.products, "username", "seller");
		};

		init();
	};


	var productEditionController = function(product, categories, productsService, categoriesService, auxFunctions) {

		var editor = this;

		editor.product = product

		editor.update = function(product) {
			productsService.update(product)
		}

		editor.addPhoto = function(photos, photo){
			auxFunctions.addElement(photos, photo)
		}

		editor.addCategory = function(newCategory) {
			auxFunctions.addElement(editor.product.categories, newCategory, "description", { notAllowRepeated: true });
		};

		editor.removeCategory = function(category){
			auxFunctions.removeElement(editor.product.categories, category);
		};

		 function init () {
			editor.categories = categories;
		};

		init();
	}

	angular.module('stores')
		.controller('productsListController', productsListController)
		.controller('productEditionController', productEditionController)

})();