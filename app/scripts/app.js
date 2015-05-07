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
    'mgcrea.ngStrap',
    'smart-table',
    'fileReaderModule',
    'utils',
    'stores',
    'categories',
    'users',
    'statistics',
    'entityManager',
    'angularModalService'
  	])
  .constant('apiBaseUrl', 'http://' + window.location.host)
  .config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/stores/list');
  
  $stateProvider

    /*** STORES ***/

    .state('stores', {
      url: '/stores',
      abstract : true,
      template: '<ui-view/>'
    })

  	.state('stores.list', {
  	  url: '/list',
  	  templateUrl: 'views/stores/list.html',
  	  controller: 'storesListController as list',
  	  resolve : {
  	  	storesList : function(storesService) {
  	  		return storesService.retrieveAll()
  	  	}
  	  }
  	})

    .state('stores.edition', {
      url: '/edit/:storeId',
      templateUrl: 'views/stores/edit.html',
      controller: 'storeEditionController as editor',
      resolve: {
        store: function(storesService, $stateParams) {
            var storeId = $stateParams.storeId;
            return storesService.getStoreById(storeId)
        },

        categories: function(categoriesService) {
            return categoriesService.retrieveAll()
        }
      }
    })

    .state('stores.create', {
        url: '/create',
        templateUrl: 'views/stores/create.html',
        controller: 'storesCreateController as editor'
    })

    /*** CATEGORIES ***/

    .state('categories', {
      url: '/categories',
      abstract : true,
      template: '<ui-view/>'
    })

    .state('categories.list', {
      url: '/list',
      templateUrl: 'views/categories/list.html',
      controller: 'categoriesListController as list',
      resolve : {
        categoriesList : function(categoriesService) {
          return categoriesService.retrieveAll()
        }
      }
    })

    .state('categories.editor', {
      url: '/edit/:categoryId',
      templateUrl: 'views/categories/main-category-editor.html',
      controller: 'categoryEditorCtrl as editor',
      resolve : {
        category : function(categoriesService, $stateParams) {
          var categoryId = $stateParams.categoryId;
          return categoriesService.getCategoryById(categoryId)
        }
      }
    })

    .state('categories.create', {
      url: '/create',
      templateUrl: 'views/categories/editor.html',
      controller: 'categoryCreationCtrl as editor',
    })


    /***PRODUCTS ***/

    .state('products', {
      url: '/products',
      abstract : true,
      template: '<ui-view/>'
    })

    .state('products.list', {
      url: '/list',
      templateUrl: 'views/products/list.html',
      controller: 'productsListController as list',
      resolve : {
        productsList : function(productsService) {
          return productsService.retrieveAll()
        }
      }
    })

    .state('products.edition', {
      url: '/edit/:productId',
      templateUrl: 'views/products/edit.html',
      controller: 'productEditionController as editor',
      resolve : {
        product : function(productsService, $stateParams) {
          var productId = $stateParams.productId;
          return productsService.getProductById(productId)
        },

        categories : function(categoriesService) {
          return categoriesService.retrieveAll()
        }
      }
    })

    /*** USERS ***/

    .state('users', {
      url: '/users',
      abstract : true,
      template: '<ui-view/>'
    })

    .state('users.list', {
      url: '/list',
      templateUrl: 'views/users/list.html',
      controller: 'usersListController as list',
      resolve : {
        usersList : function(usersService) {
          return usersService.retrieveAll()
        }
      }
    })

    .state('users.edition', {
      url: '/edit/:username',
      templateUrl: 'views/users/edit.html',
      controller: 'userEditorController as editor',
      resolve : {
        user : function(usersService, $stateParams) {
          var username = $stateParams.username;
          return usersService.getUserByName(username)
        }
      }
    })

    /*** ***/ 

    .state('stats', {
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
          return statsService.getSystemStats()
        }
      }
    })
  }])

})()