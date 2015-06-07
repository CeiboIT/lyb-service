(function () {
	'use strict';

	var Landing = angular.module('landing', []);

	Landing.controller('LandingController', 
		['$log', '$state', 'authService', function ($log, $state, authService) {
		var landing = this;

		var user = authService.getUser();

		landing.username = user.username;
		
		landing.goTo = function (stateName) {
			$state.go(stateName);
		};

		landing.logout = function () {
			authService.logout()
				.success(function (){ 
					$state.go('login');
				})
				.error(function (error) { 
					$log.error(error);
				});
		};

		if (authService.isAdmin()) {
			landing.menuItems = [
				{
					name: 'Products',
					state: 'products.list'
				},
				{
					name: 'Categories',
					state: 'categories.list'
				},
				{
					name: 'Users',
					state: 'users.list'
				},
				{
					name: 'Stores',
					state: 'stores.list'
				},
				{
					name: 'Stats',
					state: 'stats.general'
				}
			];
		} else if (user.role === 'seller') {
			landing.menuItems = [
				{
					name: 'Products',
					state: 'products.list'
				},
				{
					name: 'Categories',
					state: 'categories.list'
				}];
		}
	}]);

}());