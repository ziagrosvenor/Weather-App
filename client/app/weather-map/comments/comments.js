angular.module('weather.comments', [
	'app.models.comments',
	'app.models.weather',
	'comments.create',
	'comments.update',
	'ngAnimate'
	])
	.config(function ($stateProvider){
		$stateProvider
			.state('weatherApp.list.create', {
				url: '/new-comment',
				views: {
					'comments@' : {
						controller: 'CreateCommentCtrl',
						templateUrl: '/app/weather-map/comments/create/create-comment.html'
					}
				}
			})
		;
	})
	.controller('ListCommentsCtrl', ['$scope', 'commentsFactory', '$http' , function ($scope, commentsFactory, $http) {
		$scope.comments = commentsFactory.query();

		$scope.removeComments = function() {
			var oldComments = $scope.comments;
			$scope.comments = [];
			commentsSelected = {
				_id: [
	
				]
			};

			angular.forEach(oldComments, function (comment) {
				if(comment.selected) commentsSelected._id.push(comment._id);
				if(!comment.selected) $scope.comments.push(comment);
			});
		
			commentsFactory.delete(commentsSelected, function (result) {
				console.log(result);
			});
		};
	}]);

