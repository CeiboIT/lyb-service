(function () {
	'use strict';
	var Category = require('./categorySchema'),
		categoryService = require('../services/categoryService');

	function loadCategories() {
		var categories = [ 'Men\'s', 'Clothing', 'T shirts', 'Jeans', 'Outer wear', 'Underwear',
		'Shorts', 'Accessories', 'Accessories lifestyle', 'Art work', 'New Brands' ];

		categories.forEach(function (categoryTitle) {

			categoryService.getCategoryByTitle(categoryTitle)
				.then(function (response) {
					if (!response) {
						var newCategory = new Category({title: categoryTitle});
						newCategory.save();
					}
				});
		});
	}
	
	loadCategories();

}());