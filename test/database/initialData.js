(function () {
	'use strict';

    var usersService = require('../../services/usersService'),
    	categoriesService = require('../../services/categoryService'),
    	storesService = require('../../services/storesService');

	var initialData = {
		parentCategoryReq: {
			title: 'Parent'
		},
		childCategoryReq: {
			title: 'Child'
		},
		userReq: {
			username: 'lalo',
    		password: 'landa'
		},
		storeReq: {
			name: 'Tienda'
		},
		addCategories: function () {
			var that = this;
            return categoriesService.create(this.parentCategoryReq)
                .then(function (parentCategory) {
                    that.parentCategory = parentCategory;
                	that.childCategoryReq.parent = parentCategory;
                    return categoriesService.create(that.childCategoryReq)
                    	.then(function (childCategory) {
                    		that.childCategory = childCategory;
                    	});
                });
        },
        // Embedded document way
        // addCategories: function () {
        //     var that = this;
        //     return categoriesService.create(this.parentCategoryReq)
        //         .then(function (parentCategory) {
        //             parentCategory.subCategories = [that.childCategoryReq];
        //             parentCategory.save()
        //                 .then(function (parentCategory) {
        //                     that.childCategory = parentCategory.subCategories[0];
        //                     that.parentCategory = parentCategory;
        //                 });
        //         });
        // },
        addStore: function () {
        	this.storeReq.owner = this.userReq;
        	return storesService.create(this.storeReq);
        },
        loadAll: function () {
        	var that = this;
        	that.addCategories();
        	return that.addStore()
    			.then(function (store) { 
    				that.store = store;
    				return usersService.getUserByName(that.userReq.username)
    					.then(function (user) {
							that.user = user;
    					});
    			});
        }
    };
    
	module.exports = initialData;	

}());