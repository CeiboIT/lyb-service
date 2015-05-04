angular
.module('lybApp')
.controller('itemsCtrl', ['$scope', function($scope) {

	$scope.itemMenu = function() {
		$scope.itemsVisble = !$scope.itemsVisble
	}

}])