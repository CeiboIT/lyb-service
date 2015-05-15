var EntityViews = angular.module('entityViews', []);

EntityViews.run(function (loadTemplate) {
    // load templates into $templateCache
    loadTemplate('/views/commons/entity_list.html', 'entity_list');
    loadTemplate('/views/commons/confirm.html', 'entity_remove_confirm');
});

EntityViews.controller('RemoveEntityDialogController', 
   function ($scope, $log,  $modalInstance, action, confirmText) {
        $scope.confirmText = confirmText;
        $scope.ok = function () {
            action()
                .then(function () {
                    $modalInstance.close();
                }, function (error) {
                    $log.error('RemoveEntityDialogController > action ' + JSON.stringify(error));
                    $scope.entityErrors = [{text: 'Mmmmm, something went wrong, please try again.' }];
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

// EntityViews.factory('createOrUpdateBase', function () {
//     return {
//         isClean: function (original, entity) {
//             return angular.equals(original, entity);
//         },
//         ok: function (action, entity, entityErrors) {
//             $log.debug('CreateOrUpdateDialogController > ' + action);
//             action(entity)
//                 .then(function (response) {
//                     $modalInstance.close(response);
//                 }, function (error) {
//                     $log.error('CreateOrUpdateDialogController > ' + error);
//                     entityErrors = [{text: 'Mmmmm, something went wrong, please try again.' }];
//                 });
//         };        
//     }
// });

// The popup create a new scope, but inherit from a user specified scope.
EntityViews.controller('CreateOrUpdateController', 
    function ($log, $modalInstance, createOrUpdateMixin) {
        var controller = this; 
        angular.extend(controller, createOrUpdateMixin);
        controller.entityErrors = [];

        controller.isClean = function () {
            return angular.equals(controller.original, controller.entity);
        };

        controller.ok = function () {
            $log.debug('CreateOrUpdateDialogController > ' + controller.action);
            controller.action(controller.entity)
                .then(function (response) {
                    $modalInstance.close(response);
                }, function (error) {
                    $log.error('CreateOrUpdateDialogController > ' + error);
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
            // angular.extends(CreateOrUpdateController, options.createOrUpdateMixin);
            var modalInstance = $modal.open({
                template: options.createTemplate,
                size: options.size || 'md',
                controller: 'CreateOrUpdateController',
                controllerAs: 'createController',
                resolve: {
                    createOrUpdateMixin: function () {
                        return options.createOrUpdateMixin;
                    }
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
            function _createOrUpdateDialog() {
                return createOrUpdateDialog.createFor({
                    createTemplate: options.createTemplate,
                    size: options.size,
                    createOrUpdateMixin: options.createOrUpdateMixin
                });
            }
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
                    angular.extend(options.createOrUpdateMixin, {
                        original: options.entityService.copy(entity),
                        entity: entity,
                        action: function () {
                            // function to be applied when the "ok" button in the dialog is pressed
                            return options.entityService.update(entity);
                        }
                    });
                    _createOrUpdateDialog()
                        .result.then(function () {
                            crudOps.updateList();
                        });        
                },
                create: function () {
                    // open a dialog to create a new entity
                    var newEntity = options.entityService.newEntity(); // new empty entity
                    // add mixin to the base CreateOrUpdateController to provide additional functions
                    angular.extend(options.createOrUpdateMixin, {
                        original: {}, // used in the isClean function to check if the user make any change to the object
                        entity: newEntity,
                        action: function () { // function to be applied when the "ok" button in the dialog is pressed
                            return options.entityService.save(newEntity);
                        }
                    });
                    _createOrUpdateDialog()
                        .result.then(function () {
                            $log.debug('entityManager created new entity');
                            crudOps.updateList(); // update list after a change in the entity
                        });
                }
            };
            angular.extend(crudOps, options);
            return crudOps.updateList();
        }
    };
});