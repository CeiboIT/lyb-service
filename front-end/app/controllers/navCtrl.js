angular
.module('lybApp')
.controller('navCtrl', ['$scope', function($scope) {
	$scope.navMenu = function(){
		$scope.navMenuVisble = !$scope.navMenuVisble;
	}

	$scope.navMenuClose = function(){
		$scope.navMenuVisble = false;
	}
}])
