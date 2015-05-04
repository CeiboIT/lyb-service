angular
.module('lybApp')
.controller('headerCtrl', ['$scope', function($scope) {


	
		// MENU SIDE BAR 

		$scope.siteSearch = function (){
			$scope.mainWidgetMenu = !$scope.mainWidgetMenu
			$scope.brosweWidgetWrapper = false
			$scope.searchWigetWrapper = false
			$scope.mixmenuWidgetWrapper = false
		};

		$scope.categorySearch = function (){
			$scope.brosweWidgetWrapper = !$scope.brosweWidgetWrapper
			$scope.mainWidgetMenu = !$scope.mainWidgetMenu
			$scope.searchWigetWrapper = true
			$scope.mixmenuWidgetWrapper = true
		};

		$scope.mixSearch = function (){
			$scope.mixMenuWidgetWrapper = !$scope.mixMenuWidgetWrapper
			$scope.mainWidgetMenu = !$scope.mainWidgetMenu
			$scope.searchWigetWrapper = true
			$scope.mixmenuWidgetWrapper = true
			$scope.brosweWidgetWrapper = false
		};

}])