var module = angular.module('example-app', ['webrtc-photo-booth']);

module.controller('ExampleAppController', function($scope) {
	$scope.images = [];
	var canvas = document.getElementById('render-canvas');
	var context = canvas.getContext('2d');

	$scope.takePhoto = function(video) {
		console.log("controller: " + video.videoHeight);
		var height = video.videoHeight;
		var width = video.videoWidth;
		context.drawImage(video, 0, 0, width, height);

		var data = canvas.toDataURL('image/png');
		scope.images.push({source: data});
	}
});