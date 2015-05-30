(function () {
	'use strict';

	var Landing = angular.module('landing', []);

	Landing.controller('LandingController', 
		['$state', 'authService', function ($state, authService) {
		var landing = this;

		var user = authService.getUser();

		landing.username = user.username;
		
		landing.goTo = function (stateName) {
			$state.go(stateName);
		};

		landing.logout = function () {
			authService.loginAsAdmin();
			$state.go('stores.list', {}, {reload: true});	
		};

		if (user.role === 'admin') {
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