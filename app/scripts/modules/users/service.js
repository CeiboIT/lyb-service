(function() {

	'use strict';
	var User = angular.module('users');

	User.factory('userService', ['entityService', function (entityService) {
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
	}]);	

	User.factory('userViewDetail', ['$modal', 'userService', 'userProfileFormatter',
		function ($modal, userService, userProfileFormatter) {
		return function (user) {
			userService.get(user.id)
				.then(function (savedUser) {
					return $modal.open({
						templateUrl: 'scripts/modules/users/detail.html',
						controller: 'UserDetailController',
						controllerAs: 'detail',
						resolve: {
							user: function () { 
								return userProfileFormatter(savedUser); 
							}	
						}});
				});
		};
	}]);

	User.factory('userFilter', function () {
		return function (userController) {
			return function (entity) {
		        var username = true,
		            email = true,
		            type = true;

		        if (userController.filters && userController.filters.username && entity.username) {
		        	username = entity.username.match(new RegExp(userController.filters.username, 'i'));
		        }

		        if (userController.filters && userController.filters.email && entity.email) {
		        	email = entity.email.match(new RegExp(userController.filters.email, 'i'));
		        }

		        // TODO use another attribute to check if it's a Seller/Buyer
				if (userController.filters && userController.filters.type && entity.__t) {
		        	type = entity.__t.match(new RegExp(userController.filters.type, 'i'));
		        }
		        return username && email && type;
		    };
		};
	});

	User.factory('userProfileFormatter', [ function () {
		return function (user) {
			var formattedUser = {};
			if (user.facebook) {
				formattedUser = {
					username: user.facebook.name,
					name: user.facebook.name,
					email: user.facebook.email,
					facebook: true,
					profilePhoto: 'http://graph.facebook.com/' + user.facebook.id + '/picture'
				};
			} else {
				formattedUser = {
					username: user.username,
					name: user.username,
					email: user.email,
					profilePhoto: user.profilePhoto || '/images/profile-default.jpg'
				};
			}
			formattedUser.id = user._id;
			formattedUser.creationDate = user.creationDate;
			formattedUser.lastLogin = user.lastLogin;
			formattedUser.tracking = user.tracking;

			return formattedUser;
		};
	}]);
		
}());