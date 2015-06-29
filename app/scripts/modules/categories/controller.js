(function() {

	'use strict';
	var Category = angular.module('categories');

	Category.run(function (loadTemplate) {
		loadTemplate('/scripts/modules/categories/create.html', 'category_create');
	});

	Category.controller('CategoryViewController', 
		['$templateCache','categoryService', 'entityManagerView', 'categoryCreateOrUpdateMixin',
		 'authService','ownerMixin',
		function ($templateCache, categoryService, entityManagerView, categoryCreateOrUpdateMixin,
		 authService, ownerMixin) {
		// Controller for the Category view
		var categoryController = this;

		var opts = {
	        entityService: categoryService,
	        createTemplate: $templateCache.get('category_create'),
	        createOrUpdateMixins: [categoryCreateOrUpdateMixin(), 
	        { isAdmin: authService.isAdmin() },
	        ownerMixin()],
	        listName: 'Categories',
	        newName: 'Add category',
	        noResultsText: 'No results found',
	        confirmText: 'Are you sure?'
	    };

		if (authService.isAdmin()) {
			categoryController.perms = { editParents: true };
		} else {
			categoryController.perms = { editParents: false };	
		}

		var filterCategories = function (entity) { 
			var title = true;
			// TODO add nested search into subCategories
			if (categoryController.filters && categoryController.filters.title) {
				title = entity.title.match(new RegExp(categoryController.filters.title, 'i'));
			}
            return title;
    	};

		entityManagerView.createFor(opts)
			.then(function(entityManager) {
				categoryController.entityManager = entityManager;
				categoryController.entityManager.filterFn = filterCategories;
			});
	}]);

	Category.factory('ownerMixin', ['authService', 'categoryService', 
		function(authService) {
		return function () {
			var response = {
				isAdmin: authService.isAdmin()
			};
			return response;
		};
	}]); 

}());