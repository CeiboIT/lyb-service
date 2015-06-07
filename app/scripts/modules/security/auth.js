(function () {
    'use strict';

    var AuthService = angular.module('ceibo.auth', []);
    
    AuthService.factory('authInterceptor', ['$q', '$injector', '$log', 
        function ($q, $injector, $log) {
        return {
            responseError: function (response) {
                if(response.status === 403) {
                    $log.debug('403 returned');
                    $injector.get('$state').go('login');
                }
                return $q.reject(response);
            }
        };
    }]);

    AuthService.factory('identityService', ['$log', '$window', '$q',
        function ($log, $window, $q) {
        var identity = {},
            identityService = {
                setIdentity: function (newIdentity) {
                    identity = newIdentity;
                    var identityJson = angular.toJson(newIdentity);
                    $log.debug('userIdentity: ' + identityJson);
                    $window.sessionStorage.setItem('lyb.identity', identityJson);
                },
                removeIdentity: function () {
                    identity = undefined;
                    $window.sessionStorage.removeItem('lyb.identity');
                },
                getUserIdentity: function () {
                    // recupera la identity del user, si no, lanza un reject para ser manejado por el caller.
                    // Devuelve una promise por si hay que re-loginiar al user.
                    var deferred = $q.defer();
                    identity = identity || this.restoreUser();
                    if (identity) {
                        deferred.resolve(identity);
                    } else {
                        deferred.reject({ error: 'Not logged user'});
                    }
                    return deferred.promise;
                },
                restoreUser: function () {
                    // recupera la identity del usuario desde sessionStorage.
                    var saved = $window.sessionStorage.getItem('lyb.identity');
                    if (saved) {
                        $log.debug('user restored ' + saved);
                        return angular.fromJson(saved);
                    }
                    return false; // no estaba la identity en la sesion
                },
                isAuthenticated: function() {
                    return identity || this.restoreUser();
                }
            };
            return identityService;
    }]);

    AuthService.factory('authService', ['$window', '$state', '$http', 'identityService', 
        function ($window, $state, $http, identityService) {
        var auth = {
            isAdmin: function () {
                return auth.getUser().__t === 'Admin';
            },
            getUser: function () {
                var user = $window.sessionStorage.getItem('lyb.identity');
                return JSON.parse(user);
            },
            getStoreId: function () {
                var user = this.getUser();
                if (user && user.store) {
                    return user.store._id;
                }
            },
            login: function (credentials) {
                return $http.post('/auth/login', credentials)
                    .then(function (response) {
                        if (response.data && response.data.identity) { // login ok
                            identityService.setIdentity(response.data.identity);
                            return { identity: response.data.identity };
                        }
                    });
            },
            logout: function () {
                return $http.post('/auth/logout');
            }
        };
        return auth;
    }]);
}());