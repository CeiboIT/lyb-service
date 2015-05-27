(function () {
	'use strict';

	var Landing = angular.module('landing', []);

	Landing.controller('LandingController', ['$window', '$state', function ($window, $state) {
		var landing = this;

		var user = JSON.parse($window.sessionStorage.getItem('user'));

		landing.goTo = function (stateName) {
			$state.go(stateName);
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