	
	'use strict';

	 angular
		.module("lybApp", ['ui.router'])
		.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
			$urlRouterProvider.otherwise('/');

			$stateProvider
				.state('home' , {
					url: '/',
					templateUrl: 'app/templates/home.html',
					controller:  'storeCtrl'
				})
				.state('view' , {
					url: '/view',
					templateUrl: 'app/templates/view.html',
					controller: 'storeCtrl'
				})
				.state('profile' , {
					url: '/profile',
					templateUrl: 'app/templates/profile.html'
					//controller:  'footerCtrl'
				})
				.state('following' , {
					url: '/following',
					templateUrl: 'app/templates/following.html'
					//controller:  'footerCtrl'
				})
				.state('followers' , {
					url: '/followers',
					templateUrl: 'app/templates/followers.html'
					//controller:  'aboutCtrl'
				});
		
		}])
		
		