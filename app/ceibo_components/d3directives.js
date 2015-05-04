(function(){

	var link = function($scope, iElm, iAttrs, controller) {
		var color = d3.scale.category10();
		var calculatePercentage = function(total, num) {
			var percentage = ((num * 100) / total);
			console.log(percentage.length);
			return percentage.toFixed(2)
		};

		var w = 250;
		var h = 250;
		var r = h/2;

		var data = $scope.data;
		var total = 0;
		//calculate total
		for (var i = 0; i < $scope.data.length; i++) {
			total += $scope.data[i][iAttrs.yaccessor];
		};

		var vis = d3.select(iElm[0]).append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
		var pie = d3.layout.pie().value(function(d){
			return d[iAttrs.yaccessor] || d;
		});

		// declare an arc generator function
		var arc = d3.svg.arc().outerRadius(r);

		// select paths, use arc generator to draw
		var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
		arcs.append("svg:path")
		    .attr("fill", function(d, i){
		        return color(i);
		    })
		    .attr("d", function (d) {
		        // log the result of the arc generator to show how cool it is :)
		        return arc(d);
		    });

		// add the text
		arcs.append("svg:text").attr("transform", function(d){
							d.innerRadius = 0;
							d.outerRadius = r;
				    return "translate(" + arc.centroid(d) + ")";})
							.attr("text-anchor", "middle")
							.attr("fill","white")
							.text( function(d, i) {
								if($scope.options.showPercentages){
									return (d.data[iAttrs.xaccessor] || d) + " " + calculatePercentage(total, d.data[iAttrs.yaccessor])  + "%"
								} else {
							    	return d.data[iAttrs.xaccessor] || d
								}
							});

	}

	var utilsServices = function() {

		var utils = {};
		this.a = 'Hola'

		utils.calculatePercentage = function(total, num) {
			return ((num * 100) / total) 
		};

		return utils;
		
	}

	var pieChartDirective = {
		// priority: 1,
		// terminal: true,
		 scope: {
		 	data : '=',
		 	options: '='
		 }, // {} = isolate, true = child, false/undefined = no change
		// controller: chartsController,
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: link
	}


	angular.module('ceibo.d3',[])
		.factory('utilsServices', utilsServices)
		.directive('pieChart', function(utilsServices){
			return pieChartDirective
		})
})()