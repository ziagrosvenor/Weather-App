var app = angular.module('eventsApp', ['ngResource'])
			.controller('CommentsController', ['$scope', function ($scope) {
				$scope.comments = [
					{text: 'First comment'}
				];

				$scope.addComment = function() {
					$scope.comments.push({text: $scope.commentText});
					// $scope.commentText = "";
				};

				$scope.removeComments = function() {
					var oldComments = $scope.comments;
					$scope.comments = [];
					angular.forEach(oldComments, function (comment) {
						if(!comment.selected) $scope.comments.push(comment);
					});
				};
			}]);