angular
.module('lybApp')
.controller('footerCtrl', ['$scope', function($scope) {

	$scope.StorefooterBar = function (){
	   $scope.isVisable = !$scope.isVisable;
	}

}])