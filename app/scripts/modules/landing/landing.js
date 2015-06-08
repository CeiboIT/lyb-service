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

		landing.menuItems = [ {
			name: 'Products',
			state: 'products.list'
		},
		{
			name: 'Categories',
			state: 'categories.list'
		}];

		if (authService.isAdmin()) {
			landing.menuItems = landing.menuItems.concat([
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
			]);
		}
	}]);

}());