var RestServices = angular.module('restServices', []);

RestServices.factory('restConfig', function (Restangular) {
    return {
        getBaseUrl: function () {
            return '/';
        },
        getRestForEntity: function (entityName) {
            var baseUrl = this.getBaseUrl();
            return Restangular.withConfig(function (RestangularConfigurer) {
                RestangularConfigurer.setBaseUrl(baseUrl);
                // add headers for authentication based request
                RestangularConfigurer.setDefaultHeaders({ 'withCredentials': 'true'} );
                // override default 'id' with '_id' to work with mongoDB
                RestangularConfigurer.setRestangularFields({ id:'_id'});
            }).service(entityName);
        }
    };
});
        
RestServices.factory('entityService', function ($q, Restangular, restConfig) {
    return {
        getCrudFor: function (entityName, formatters) {
            return {
                rest: restConfig.getRestForEntity(entityName),
                getAll: function () {
                    return this.rest.getList();
                },
                update: function (entity) {
                     if (formatters && formatters.preUpdate) {
                        return formatters.preUpdate(entity).put();
                    }
                    return entity.put();
                },
                save: function (entity) {
                    if (formatters && formatters.preSave) {
                        return this.rest.post(formatters.preSave(entity));
                    }
                    return this.rest.post(entity);
                },
                remove: function (entity) {
                    return entity.remove();
                    // return this.rest.one('remove').one(entity.id.toString()).post(); 
                },
                createEntity: function () {
                    return this.rest.one();
                },
                get: function (id) {
                    return this.rest.one(id).get();
                },
                copy: function(original) {
                    return Restangular.copy(original);
                },
                newEntity:  function () { //to override in the specific services
                    return {};
                }
            };
        }
    };
});