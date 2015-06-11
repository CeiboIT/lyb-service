(function(){

	'use strict';

	var ProductViewController = 
		function ($templateCache, authService, productsService, entityManagerView, 
			categoryCreateOrUpdateMixin, imageMixin) {
		
		var productController = this,
				opts = {
			        entityService: productsService,
			        createTemplate: $templateCache.get('product_create'),
			        listName: 'Products',
			        createOrUpdateMixins: [categoryCreateOrUpdateMixin(), imageMixin],
			        scope: productController,
			        newName: 'Add product',
			        noResultsText: 'No results found',
			        confirmText: 'Are you sure?',
			    };
			    
		productController.filters = {
			name: '',
			description: ''
		};

		if (authService.isAdmin()) {
			productController.perms = { add: false };
		} else {
			productController.perms = { add: true };	
		}

		entityManagerView.createFor(opts)
			.then(function (entityManager) {
				productController.entityManager = entityManager;
				// productController.entityManager.filterFn = filterCategories;
			});
	};

	var plain = function (categories) {
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