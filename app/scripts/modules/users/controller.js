(function() {

	'use strict';

	var User = angular.module('users');

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

	User.controller('UserViewController', 
		['$templateCache', 'userService', 'entityManagerView', 'userFilter',
		function ($templateCache, userService, entityManagerView, userFilter) {
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
					userController.entityManager.filterFn = userFilter(userController);
				});
		
		// userController.filters = {name: '', email: ''};

	}]);

	User.controller('UserDetailController', ['$modalInstance', 'user', 'userService',
	function ($modalInstance, user) {
		var controller = this;
		controller.user = user;
        controller.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

	}]);

	User.directive('userView', function () {
		return {
			restrict: 'AE',
			scope: {
				model: '='
			},
			templateUrl: 'scripts/modules/users/list_detail.html',
			controllerAs: 'userView',
			controller: function ($scope, userViewDetail, userProfileFormatter) {
				var userView = this;
				
				userView.view = function (user) {
					userViewDetail(user);
				};

				userView.user = userProfileFormatter($scope.model);
			}
		};
	});

	User.directive('altoUnique', ['$log', 'userService',
	function ($log, userService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, element, attrs, ngModel) {
            element.bind('blur', function () {
                if (!ngModel || !element.val()) {
                    return;
                }
                var currentValue = element.val();
                $log.debug('validate unique username: ' + currentValue);
                userService.uniqueUsername(currentValue)
                    .then(function (unique) {
                        //Ensure value that being checked hasn't changed
                        //since the Ajax call was made
                        $log.debug('is unique? ' + currentValue + ' ' + unique);
                        if (currentValue == element.val()) { 
                            ngModel.$setValidity('unique', unique === true);
                        }
                    }, function () {
                        $log.error('error in unique validation');
                        ngModel.$setValidity('unique', false);
                    });
            });
        }
    };
	}]);

}());