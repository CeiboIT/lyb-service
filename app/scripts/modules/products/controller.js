(function(){

	'use strict';

	var ProductViewController = 
		function ($templateCache, productsService, entityManagerView, 
			categoryCreateOrUpdateMixin, photoMixin) {
		
		var productController = this,
				opts = {
			        entityService: productsService,
			        createTemplate: $templateCache.get('product_create'),
			        listName: 'Products',
			        createOrUpdateMixins: [categoryCreateOrUpdateMixin(), photoMixin],
			        scope: productController,
			        newName: 'Add product',
			        noResultsText: 'No results found',
			        confirmText: 'Are you sure?'
			    };

		productController.filters = {
			name: '',
			description: ''
		};

		entityManagerView.createFor(opts)
			.then(function(entityManager) {
				productController.entityManager = entityManager;
				// productController.entityManager.filterFn = filterCategories;
			});
	};

	angular.module('products')
		.run(function (loadTemplate) {
			loadTemplate('views/products/create.html', 'product_create');
		})
		.controller('ProductViewController', ProductViewController);
}());