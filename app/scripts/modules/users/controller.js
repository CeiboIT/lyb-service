(function() {

	'use strict';

	var User = angular.module('users', []);

	User.config(['$stateProvider', function ($stateProvider) {
		$stateProvider.state('users.list', {
	        url: '/list',
	        templateUrl: 'scripts/modules/users/list.html',
	        controller: 'UserViewController as entityController'
	    });
	}]);

	User.run(function(loadTemplate) {
		loadTemplate('scripts/modules/users/create.html', 'user_create');
	});

	User.controller('UserViewController', ['$templateCache', 'userService', 'entityManagerView',
		function ($templateCache, userService, entityManagerView) {
		// Controller for the User view
		var userController = this,
			opts = {
	      		entityService: userService,
		        createTemplate: $templateCache.get('user_create'),
		        size: 'lg',
		        listName: 'Users',
		        newName: 'Add user',
		        noResultsText: 'No results found',
		        confirmText: 'Are you sure?'
		    };	
			entityManagerView.createFor(opts)
				.then(function(entityManager) {
					userController.entityManager = entityManager;
				});
	}]);

	User.directive('userView', function () {
		return {
			restrict: 'E',
			scope: {
				model: '='
			},
			templateUrl: 'scripts/modules/users/detail.html',
			controllerAs: 'userView',
			controller: function ($scope) {
				var userView = this;
				if ($scope.model.facebook) {
					userView.user = {
						username: $scope.model.facebook.name,
						name: $scope.model.facebook.name,
						email: $scope.model.facebook.email
					};
				} else {
					userView.user = {
						username: $scope.model.username,
						name: $scope.model.username,
						email: $scope.model.email
					};
				}
			}
		};
	});
}());