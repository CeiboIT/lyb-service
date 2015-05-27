(function() {

	'use strict';

	var UserViewController = 
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
	};
	UserViewController.$inject = ['$templateCache', 'userService', 'entityManagerView'];

	angular.module('users')
		.run(function(loadTemplate) {
			loadTemplate('scripts/modules/users/create.html', 'user_create');
		})

		.controller('UserViewController', UserViewController);
}());