(function(){

	'use strict'

	var statisticsController = function(data, auxFunctions) {
		var stats = this
		stats.data = data;
		stats.graph = data.slice(1);
	}

	angular.module('statistics')
		.controller('statisticsController', statisticsController)
})();