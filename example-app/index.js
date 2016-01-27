var module = angular.module('example-app', ['webrtc-photo-booth']);

module.controller('ExampleAppController', function($scope) {
	$scope.images = [];
	var id = 0;
	
	$scope.takePhoto = function(image) {
		id++;
		$scope.images.push({id: id, source: image});
	}

	$scope.removePhoto = function(id) {
		for (var i in $scope.images) {
			if ($scope.images[i].id == id) {
				$scope.images.splice(i, 1);
				return;
			}
		}
	}
});