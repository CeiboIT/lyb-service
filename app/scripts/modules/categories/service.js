(function(){

	'use strict';
	
	var collectCategoryId = function () {
		return function (entity) {
			// collect the _id attributes from object Category
			entity.categories = _.pluck(entity.categories, '_id');
			return entity;
		};
	};

	var categoryCreateOrUpdateMixin = function ($log, categoryService) {
		// Mixin to be added to createOrUpdate dialogs from entityManager. The mixin provide
		// the logic to add/remove/list categories related to an entity, like store o product.		
		var mixin = {
			addCategory: function (categories, category) {
				$log.debug('categoryCreateOrUpdateMixin > addCategory > adding ' + category.title);
				// check if the category is not already added
				if (categories.indexOf(category) < 0) {
					categories.push(category);
				}
			},
			removeCategory: function (categories, categoryId) {
				$log.debug('categoryCreateOrUpdateMixin > removeCategory > removing ' + categoryId);
				var index = categories.indexOf(categoryId);
				if (index >= 0) {
					categories.splice(index, 1);
				}
			}
		};
		categoryService.getAll()
	    	.then(function(response) {
    			mixin.categories = response;
			}); 
		return mixin;		
	};

	var categoryService = function (entityService) {
		return entityService.getCrudFor('categories');
	};

	angular.module('categories')
		.factory('collectCategoryId', collectCategoryId)
		.factory('categoryCreateOrUpdateMixin', categoryCreateOrUpdateMixin)
		.factory('categoryService', categoryService);
}());