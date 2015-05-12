var EntityViews = angular.module('entityViews', []);

EntityViews.run(function ($http, $templateCache) {
    $http.get('/views/commons/entity_list.html')
        .then(function (response) {
            $templateCache.put('entity_list', response.data);
        });
});


EntityViews.controller('RemoveEntityDialogController', 
   function ($scope, $modalInstance, action, confirmText) {

        $scope.confirmText = confirmText;
        $scope.ok = function () {
            $scope.$emit('guiweb.waiting', { waiting: true });
            action()
                .then( function () {
                    $modalInstance.close();
                    $scope.$emit('guiweb.waiting', { waiting: false });
                }, function () {
                    $scope.entityErrors = [{text: 'Mmmmm, algo inesperado ocurrio. Por favor, intentar nuevamente.' }];
                    //FINALLY?
                    $scope.$emit('guiweb.waiting', { waiting: false });
                });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
    

EntityViews.factory('removeDialog', function ($modal, $templateCache) {
    return {
        createFor: function (options) {
            return $modal.open({
                template: options.confirmTemplate || $templateCache.get('entity_remove_confirm'),
                controller: 'RemoveEntityDialogController',
                resolve: {
                    action: function () { 
                        return options.action;
                    },
                    confirmText: function () { return options.confirmText; }
                }
            });
        }
    };
});

// The popup create a new scope, but inherit from a user specified scope.
EntityViews.controller('CreateOrUpdateDialogController', 
    function ($modalInstance, entity, original, action) {
        
        var controller = this; 
        controller.entity = entity;
        controller.entityErrors = [];

        controller.isClean = function () {
            return angular.equals(original, controller.entity);
        };

        controller.ok = function () {
            action(controller.entity)
                .then( function (response) {
                    $modalInstance.close(response);
                }, function () {
                    controller.entityErrors = [{text: 'Mmmmm, something went wrong, please try again.' }];
                });
        };

        controller.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

// Factory to decouple $modal implementation from entityManager view.
EntityViews.factory('createOrUpdateDialog', function ($modal) {
    return {
        createFor: function (options) {
            var modalInstance = $modal.open({
                template: options.createTemplate,
                size: options.size || 'sm',
                controller: 'CreateOrUpdateDialogController',
                controllerAs: 'createController',
                resolve: options.resolve || {
                    action: function () {
                        return options.action;
                    },
                    entity: function () { return options.entity; },
                    original: function () { return options.original; }
                }
            });
            // No funciona modalInstance.opened.then( function () { $timeout(function () { angular.element('.first_input').focus(); }, 500); });
            return modalInstance;
        }
    };
});

EntityViews.factory('entityManagerView', function (createOrUpdateDialog, removeDialog, $log) {
    return {
        createFor: function (options) {
            var crudOps = {
                updateList: function () {
                    return options.entityService.getAll()
                        .then(function (response) {
                            crudOps.entities = response;
                            return crudOps;
                        });//.$object;
                },
                remove: function (entity) {
                    removeDialog.createFor({
                        action: function () {
                            return options.entityService.remove(entity);
                        },
                        confirmText: options.confirmText
                    }).result.then( function () {
                        crudOps.updateList();
                    });
                },
                edit: function (entity) {
                    createOrUpdateDialog.createFor({
                        entity: entity,
                        scope: options.scope,
                        size: options.size || 'sm',
                        createTemplate: options.createTemplate,
                        original: options.entityService.copy(entity),
                        action: function () {
                            return options.entityService.update(entity);
                        }
                    }).result.then( function () {
                        crudOps.updateList();
                    });        
                },
                create: function () {
                    var newEntity = options.entityService.newEntity();
                    options.scope.entity = newEntity;
                    var response = createOrUpdateDialog.createFor({
                        entity: newEntity,
                        createTemplate: options.createTemplate,
                        original: {},
                        size: options.size || 'sm',
                        action: function () {
                            return options.entityService.save(newEntity);
                        }
                    });
                    response.result.then(function () {
                        $log.debug('entityManager created new entity');
                        crudOps.updateList();
                    });
                    return response.result;
                },
                getField:function getProperty(obj, prop) {
                    // TODO documentacion?
                    var parts = prop.split('.'),
                        last = parts.pop(),
                        l = parts.length,
                        i = 1,
                        current = parts[0];

                    if (parts.length === 0) {
                        return obj[prop];
                    } 
                    
                    while((obj = obj[current]) && i < l) {
                        current = parts[i];
                        i++;
                    }

                    if(obj) {
                        return obj[last];
                    }
                }
            };
            angular.extend(crudOps, options);
            return crudOps.updateList();
        }
    };
});