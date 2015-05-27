(function() {

	'use strict';
	
	var userService = function (entityService) {
		var service = entityService.getCrudFor('users'),
			sellerRest = service.getNested('sellers');

		service.save = function (entity) {
			// redefine save method, because only Sellers user can be created from de CMS.
			if (service.formatters && service.formatters.preSave) {
                return sellerRest.post(service.formatters.preSave(entity));
            }
            return sellerRest.post(entity);
		};
		return service;
	};	

	angular.module('stores')
		.service('userService', userService);
}());