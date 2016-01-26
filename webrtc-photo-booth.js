var module = angular.module('webrtc-photo-booth', []);

module.directive('webrtcPhotoBooth', function() {
	var video;
	var canvas;

	return {
		restrict: 'E',
		scope: {
			'res-width': '@',
			'res-height': '@',
			'photoCallback': '&'
		},
		template: '\
			<div class="webrtc-photo-booth">										\
				<video>Camera not available</video>									\
				<button ng-click="takePhoto">Take Photo</button>					\
			</div>																	\
		',
		link: function(scope, element, attrs) {
			video = element.find('video')[0];

			navigator.getUserMedia = ( navigator.getUserMedia ||
								navigator.webkitGetUserMedia ||
								navigator.mozGetUserMedia ||
								navigator.msGetUserMedia);

			var constraints = {
				audio: false,
				video: {
					width: attrs.resWidth,
					height: attrs.resHeight
				}
			};

			navigator.getUserMedia(constraints, function(stream) {
				if (navigator.mozGetUserMedia) {
					video.mozSrcObject = stream;
				} else {
					var vendorURL = window.URL || window.webkitURL;
					video.src = vendorURL.createObjectURL(stream);
				}
				video.play();
			}, function(err) {
				console.log('Could not get media stream. Error: ' + err);
			});
		},
		controller: function($scope) {
			console.log($scope.photoCallback);
			$scope.takePhoto = function() {
				console.log("directive: " + video.videoHeight);
				$scope.photoCallback(video);
			}
		}
	}
});