(function() {

	'use strict';

	var CategoryViewController = 
		function ($templateCache, categoryService, entityManagerView) {
		// Controller for the Category view
		var categoryController = this;

		var opts = {
	        entityService: categoryService,
	        createTemplate: $templateCache.get('category_create'),
	        listName: 'Categories',
	        newName: 'Add category',
	        noResultsText: 'No results found',
	        confirmText: 'Are you sure?'
	    };

		categoryController.filters = {
			title: '',
			description: ''
		};

		var filterCategories = function (entity) { 
            return entity.title.match(categoryController.filters.title) ||
                entity.description.match(categoryController.filters.description);
    	};

		entityManagerView.createFor(opts)
			.then(function(entityManager) {
				categoryController.entityManager = entityManager;
				categoryController.entityManager.filterFn = filterCategories;
			});
	};

	var loadTemplate = function ($http, $templateCache) {
		$http.get('/views/categories/create.html')
    		.then(function (response) {
     		   $templateCache.put('category_create', response.data);
    		});
    };

	angular.module('categories')
		.run(loadTemplate)
		.controller('CategoryViewController', CategoryViewController);
}());