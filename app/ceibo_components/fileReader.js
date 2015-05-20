angular.module('fileReaderModule', [])

	.service('fileReaderService', function() {
        var fileReader = function fileReader(files, loadHandler) {

            var file = files[0]; /* ie8/9 FileReader poyfill has problems with multiple uploads  */
            var reader = new FileReader();
            // out of angularjs stack
            reader.onload = function (evt) {
                var fileObject = {
                    content: evt.target.result,
                    name: file.name,
                    size: file.size,
                    type: file.type
                };

                loadHandler(fileObject);
            };
            // start reading
            reader.readAsDataURL(file);
        };
        return {
            read: fileReader
        };
    })

	.directive('dropZone', ['fileReaderService', function(fileReaderService){
		return {
			scope : {
				ngModel : '=',
				photoKey: '='
			},
			 require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			 restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
			 template: '<div class="dropbox" ng-show="!ngModel"></div><img class="dropbox" src="{{ ngModel.content || ngModel[photoKey].content }}" ng-show="ngModel"></img>',
			 transclude: true,
			link: function(scope, element, iAttrs) {
				scope.photoKey = iAttrs.photoKey;
				var dropHandler = function(event) {
					event.stopPropagation();
					event.preventDefault();
					fileReaderService.read(event.originalEvent.dataTransfer.files, loadHandler);
				};

				var dragEnterHandler = function(e) {
					e.stopPropagation();
					e.preventDefault();
				};

				var dragOverHanlder = function(e) {
					e.stopPropagation();
					e.preventDefault();
				};

				var loadHandler = function(fileObject) {
					if (angular.isArray(scope.ngModel)) {
						scope.ngModel.push(fileObject);
					} else {
						scope.ngModel = fileObject;
					}
					scope.$apply();
				};

				element
					.bind('dragover', dragOverHanlder)
					.bind('dragenter', dragEnterHandler)
					.bind('drop', dropHandler);
			}
		};
	}])

	.directive('fileInput', ['fileReaderService', function(fileReaderService){
		return {
			scope: {
				ngModel: '='
			},
		 	require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
			link: function(scope, element) {
				var loadHandler = function(fileObject) {
					if (angular.isArray(scope.ngModel)) {
						scope.ngModel.push(fileObject);
					} else {
						scope.ngModel = fileObject;
					}
					scope.$apply();
				};

				element.on('change',function(event){
					fileReaderService.read(event.target.files, loadHandler);
				});
			}
		};
	}]);