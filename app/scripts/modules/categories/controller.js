(function() {

	'use strict';
	var Category = angular.module('categories');

	Category.run(function (loadTemplate) {
		loadTemplate('/scripts/modules/categories/create.html', 'category_create');
	});

	Category.controller('CategoryViewController', 
		['$templateCache','categoryService', 'entityManagerView', 'ownerMixin',
		function ($templateCache, categoryService, entityManagerView, ownerMixin) {
		// Controller for the Category view
		var categoryController = this;

		var opts = {
	        entityService: categoryService,
	        createTemplate: $templateCache.get('category_create'),
	        createOrUpdateMixins: [ownerMixin()],
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
	}]);

	Category.factory('ownerMixin', ['authService', 'categoryService', function(authService, categoryService) {
		return function () {
			var response = {
				isAdmin: authService.isAdmin()
			};
			if (!response.isAdmin) {
				response.parentCategories = categoryService.getParents().$object;
					// .then(function (response) {
						// response.parentCategories = response;
					// });
			}
			return response;
		};
	}]); 

}());