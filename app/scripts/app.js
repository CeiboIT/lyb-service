(function(){

'use strict';

/**
 * @ngdoc overview
 * @name cmspanelApp
 * @description
 * # cmspanelApp is a control panel for the CMS made for Nate Smithen.
 *
 * Main module of the application.
 */
angular
  .module('cmspanelApp', [
    'ngAnimate',
  	'ui.router',
    'ceibo.ui',
    'ceibo.d3',
    'ceibo.auth',
    // 'mgcrea.ngStrap',
    'smart-table',
    'fileReaderModule',
    'utils',
    'stores',
    'products',
    'categories',
    'users',
    'statistics',
    'restServices',
    'restangular',
    'entityViews',
    'landing',
    'ui.bootstrap',
    'ui.select', 
    'ngSanitize'
  	])
  .constant('apiBaseUrl', 'http://' + window.location.host)
  .config(['$stateProvider','$urlRouterProvider', '$httpProvider', 'restConfigProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, restConfigProvider) {

    restConfigProvider.setBaseUrl('/');

    $httpProvider.interceptors.push('responseErrorInterceptor');

    $urlRouterProvider.otherwise('/stores/list');
    
    $stateProvider

      /*** STORES ***/

      .state('layout', {
        abstract: true,
        templateUrl: 'scripts/modules/landing/layout.html',
        controller: 'LandingController',
        controllerAs: 'landing'
      })
      .state('stores', {
        parent: 'layout',
        url: '/stores',
        abstract : true,
        template: '<ui-view/>'
      })

    	// .state('stores.list', {
    	//   url: '/list',
    	//   templateUrl: 'views/stores/list.html',
    	//   controller: 'StoreViewController as entityController'
    	// })
      
      /*** CATEGORIES ***/

      .state('categories', {
        parent: 'layout',
        url: '/categories',
        abstract : true,
        template: '<ui-view/>'
      })

      .state('categories.list', {
        url: '/list',
        templateUrl: 'views/categories/list.html',
        controller: 'CategoryViewController as entityController'
      })

      /***PRODUCTS ***/

      .state('products', {
        parent: 'layout',
        url: '/products',
        abstract : true,
        template: '<ui-view/>'
      })

      .state('products.list', {
        url: '/list',
        templateUrl: 'views/products/list.html',
        controller: 'ProductViewController as entityController'
      })

      /*** USERS ***/

      .state('users', {
        parent: 'layout',
        url: '/users',
        abstract : true,
        template: '<ui-view/>'
      })

      .state('users.list', {
        url: '/list',
        templateUrl: 'views/users/list.html',
        controller: 'UserViewController as entityController'
      })

      /*** ***/ 

      .state('stats', {
        parent: 'layout',
        url: '/stats',
        abstract : true,
        template: '<ui-view/>'
      })

      .state('stats.general', {
        url: '/general',
        templateUrl: 'views/statistics/stats.html',
        controller: 'statisticsController as stats',
       resolve : {
          data : function(statsService) {
            return statsService.getSystemStats();
          }
        }
      });
    }])
    .run(['authService', function (authService) {
        authService.loginAsAdmin();
    }])
    .factory('responseErrorInterceptor', function ($q, $log) {
        return {
            responseError: function (responseError) {
                $log.error('responseErrorInterceptor > ' + JSON.stringify(responseError));
                return $q.reject(responseError);
            }
        };
    });

}());