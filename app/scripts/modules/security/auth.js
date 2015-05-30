(function () {
    'use strict';

    var AuthService = angular.module('ceibo.auth', []);
    AuthService.factory('authService', ['$window', '$state', function ($window, $state) {
        var auth = {
            loginAsSeller: function (store) { // Mock function to demo. Need to be removed
                var seller = {
                    role: 'seller',
                    username: store.owner.username,
                    store: store
                };
                $window.sessionStorage.setItem('user', JSON.stringify(seller));
                $state.go('products.list', {}, { reload: true });
            },
            loginAsAdmin: function () {
                var adminUser = {
                    username: 'Admin',
                    role: 'admin',
                };
                $window.sessionStorage.setItem('user', JSON.stringify(adminUser));
            },
            getUser: function () {
                var user = $window.sessionStorage.getItem('user');
                return JSON.parse(user);
            },
            getStoreId: function () {
                var user = this.getUser();
                if (user && user.store) {
                    return user.store._id;
                }
            }
        };
        return auth;
    }]);
}());