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
    'ceibo.login',
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
  .config(['$stateProvider','$urlRouterProvider', '$httpProvider', 'restConfigProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, restConfigProvider) {

    restConfigProvider.setBaseUrl('/');

    $httpProvider.interceptors.push('responseErrorInterceptor');
    $httpProvider.interceptors.push('authInterceptor');


    $urlRouterProvider.otherwise('/stores/list');
    
    // https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs
    var checkLoggedin = function ($q, $timeout, $http, $location, $state) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/auth/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          /*$timeout(deferred.resolve, 0);*/
          deferred.resolve();

        // Not Authenticated
        else {
          //$timeout(function(){deferred.reject();}, 0);
          deferred.reject();
          $state.go('login');
          // $location.url('/login');
        }
      });

      return deferred.promise;
    };

    $stateProvider

      /*** STORES ***/

      .state('layout', {
        abstract: true,
        templateUrl: 'scripts/modules/landing/layout.html',
        controller: 'LandingController',
        controllerAs: 'landing',
        resolve: {
            loggedIn: checkLoggedin
        }
      })

      .state('login', {
          url: '/login',
          templateUrl: 'scripts/modules/security/login.html',
          controller: 'LoginController',
          controllerAs: 'login'
      })

      .state('stores', {
        parent: 'layout',
        url: '/stores',
        abstract : true,
        template: '<ui-view/>'
      })
      
      /*** CATEGORIES ***/

      .state('categories', {
        parent: 'layout',
        url: '/categories',
        abstract : true,
        template: '<ui-view/>'
      })

      .state('categories.list', {
        url: '/list',
        templateUrl: 'scripts/modules/categories/list.html',
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
        templateUrl: 'scripts/modules/products/list.html',
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
    .factory('responseErrorInterceptor', function ($q, $log) {
        return {
            responseError: function (responseError) {
                $log.error('responseErrorInterceptor > ' + JSON.stringify(responseError));
                return $q.reject(responseError);
            }
        };
    });

}());