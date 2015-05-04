(function(){

	'use strict'

	var categoriesListController = function(categoriesList, auxFunctions) {
		var list = this;

		//filters
		
		list.filters = {
			description: null
		}

		//Filter function
		list.categoriesFilterFn = function(category) {
		    if(list.filters.description && category.description && (category.description.toLowerCase().indexOf(list.filters.description.toLowerCase()) == -1) ) {
		        return false;
		    };

		    return true;
		};

		list.addCategory = function(newCategory) {
			auxFunctions.addElement(list.categories, newCategory, "description", { notAllowRepeated: true });
		};

		list.removeSubCategory = function(category){
			auxFunctions.removeElement(list.categories, category);
		};

		//Initialization Control
		function init() {
			list.categories = categoriesList;
		};

		init();
	};

	var categoryCreationCtrl = function(categoriesService) {

	};

	var categoryEditorCtrl = function(category, categoriesService, auxFunctions) {
		var editor = this;

		editor.category = category;

		editor.addSize = function(newSize) {
			auxFunctions.addElement(editor.category.properties.sizes, newSize, "description", { notAllowRepeated: true });
		}

		editor.removeSize = function(newSize) {
			auxFunctions.removeElement(editor.category.properties.sizes, newSize);
		}

		function init(){
			editor.category.properties = {
				sizes: []
			}
		}

		init();
	};

	angular.module('categories')
		.controller('categoriesListController', categoriesListController)
		.controller('categoryCreationCtrl', categoryCreationCtrl)
		.controller('categoryEditorCtrl', categoryEditorCtrl)
})();