(function(){

	'use strict'

	var usersListController = function(usersList, auxFunctions) {
		var list = this;

		//filters
		
		list.filters = {
			username: null
		}

		//Filter function
		list.usersFilterFn= function(user) {
		    if(list.filters.username && user.username && (user.username.toLowerCase().indexOf(list.filters.username.toLowerCase()) == -1) ) {
		        return false;
		    };

		    if(list.filters.email && user.email && (user.email.toLowerCase().indexOf(list.filters.email.toLowerCase()) == -1) ) {
		        return false;
		    };

		    return true;
		};

		//Initialization Control
		function init() {
			list.users = usersList.data;
			list.countriesSet = auxFunctions.generateSet(list.users, "country");
		};

		init();
	};

	var userEditorController = function(user, usersService) {
		var editor = this;

		editor.user = user;


		editor.update = function(userToUpdate) {
			usersService.update(userToUpdate)
		}

	}


	angular.module('users')
		.controller('usersListController', usersListController)
		.controller('userEditorController', userEditorController)

})();