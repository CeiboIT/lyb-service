(function () {
    'use strict';

    var Login = angular.module('ceibo.login', []);

    Login.controller('LoginController', 
        function ($state, $log, authService) {
    
        var login = this;
        
        login.invalidLogin = false;
        login.credentials = { username: '', password: '' };
        
        login.ok = function () {
            login.invalidLogin = false;
            authService.login(login.credentials)
                .then(function (response) {
                    if (response.identity.__t === 'Admin') {
                        $state.go('stores.list');
                    } else if(response.identity.__t === 'Seller') {
                        $state.go('products.list');
                    }
                }, function (err) {
                    $log.debug('Invalid credentials');
                    $log.error(err);
                    login.invalidLogin = true;
                });
        };
    });
} ());