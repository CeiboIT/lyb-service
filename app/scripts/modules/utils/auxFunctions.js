(function(){

	var utilsFunctionsService = function() {

		/* Generates a set from a given collection, useful for iterate over 
		this set when we want to give an autocomplete component or similar */
		this.generateSet = function(collection, key, subKey) {
			var set = [];
			if(key && subKey) {
				angular.forEach(collection, function(element){
					if(angular.isArray(element[subKey])) {
						angular.forEach(element[subKey], function(subElement){
							if(set.indexOf(subElement[key]) == -1) {
								set.push(subElement[key]);
							}
						});
					} else {
						if(set.indexOf(element[subKey][key]) == -1 ) {
							set.push(element[subKey][key]);
						}
					}
				});
			} else if(key) {
				angular.forEach(collection, function(element){
					if(set.indexOf(element[key]) == -1) {
						set.push(element[key]);
					}
				});
			} else {
				angular.forEach(collection, function(element){
					if(set.indexOf(element) == -1) {
						set.push(element);
					}
				});
			}
			return set;
		};

		this.addElement = function(collection, element, property, options) {
				if(options && options.notAllowRepeated) {
					for (var i = 0; i < collection.length; i++) {
						if(collection[i][property] == element) {
							return false;
						}
					}
					collection.push(element);
				} else {
					collection.push(element);
				}

				return true;
		};

		this.removeElement = function(collection, element) {
			var index = collection.indexOf(element);
			collection.splice(index, 1);
		};

	};

	var loadTemplate = function ($http, $templateCache) {
		return function (templateUrl, templateName) {
			$http.get(templateUrl)
	    		.then(function (response) {
	     		   $templateCache.put(templateName, response.data);
	    		});
		};
    };

	angular.module('utils')
		.factory('loadTemplate', loadTemplate)
		.service('auxFunctions', utilsFunctionsService);
}());