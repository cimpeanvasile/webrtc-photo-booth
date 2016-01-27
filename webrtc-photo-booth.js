var module = angular.module('webrtc-photo-booth', []);

module.directive('webrtcPhotoBooth', function() {
	var video;
	var canvas;

	return {
		restrict: 'E',
		scope: {
			'resWidth': '@',
			'resHeight': '@',
			'photoCallback': '&'
		},
		template: '\
			<div class="webrtc-photo-booth">										\
				<video>Camera not available</video>									\
				<button ng-click="takePhoto()">Take Photo</button>					\
				<canvas></canvas>													\
			</div>																	\
		',
		link: function(scope, element, attrs) {
			video = element.find('video')[0];
			canvas = element.find('canvas')[0];
			navigator.getUserMedia = ( navigator.getUserMedia ||
								navigator.webkitGetUserMedia ||
								navigator.mozGetUserMedia ||
								navigator.msGetUserMedia);

			var constraints = {
				audio: false,
				video: {
					width: attrs.resWidth || 640,
					height: attrs.resHeight || 480
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
			$scope.takePhoto = function() {
				var context = canvas.getContext('2d');
				var height = video.videoHeight;
				var width = video.videoWidth;
				canvas.width = width;
				canvas.height = height;
				context.drawImage(video, 0, 0, width, height);

				var image = canvas.toDataURL('image/png');
				$scope.photoCallback({image: image});
			}
		}
	}
});