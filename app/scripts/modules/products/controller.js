(function(){

	'use strict';

	var ProductViewController = 
		function ($templateCache, authService, productsService, entityManagerView, 
			categoryCreateOrUpdateMixin, imageMixin, currencyMixin) {
		
		var productController = this,
				opts = {
			        entityService: productsService,
			        createTemplate: $templateCache.get('product_create'),
			        listName: 'Products',
			        createOrUpdateMixins: [categoryCreateOrUpdateMixin(), imageMixin, currencyMixin],
			        scope: productController,
			        newName: 'Add product',
			        noResultsText: 'No results found',
			        confirmText: 'Are you sure?',
			    };
			    
		if (authService.isAdmin()) {
			productController.perms = { add: false };
		} else {
			productController.perms = { add: true };	
		}

		entityManagerView.createFor(opts)
			.then(function (entityManager) {
				productController.entityManager = entityManager;
				productController.entityManager.filterFn = filterFn;
			});
		
		var filterFn = function (entity) {
	        var name = true,
	            description = true;

	        if (productController.filters && productController.filters.name) {
	        	name = entity.name.match(new RegExp(productController.filters.name, 'i'));
	        }

	        if (productController.filters && productController.filters.description) {
	        	description = entity.description.match(new RegExp(productController.filters.description, 'i'));
	        }

	        return name && description;
		};
	};

	var plain = function (categories) {
		// transform the categories array to be displayed in a ui-select
		var result = [];
		angular.forEach(categories, function(category) {
			result.push(category);
			if (category.subCategories.length > 0) {
				_.map(category.subCategories, function (subCategory) {
					subCategory.child = true;
				});
				result = result.concat(category.subCategories);
			}
		});
		return result;
	};

	angular.module('products')
		.run(function (loadTemplate) {
			loadTemplate('scripts/modules/products/create.html', 'product_create');
		})
		.filter('plain', function () { return plain; })
		.controller('ProductViewController', ProductViewController);
}());