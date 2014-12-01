angular.module('comments.create', [])
	.controller('CreateCommentCtrl', ['$scope', '$routeParams', '$state', 'commentsFactory', function ($scope, $routeParams, $state, commentsFactory) {
		$scope.postComment = function() {
			$scope.comments = commentsFactory.query();
			var newComment = new commentsFactory();
			newComment.title = $scope.addTitle;
			newComment.content = $scope.addContent;
			$scope.addContent = "";
			$scope.addTitle = "";

			newComment.$save( function (result) {
				$scope.comments.push(result);
				$state.go('weatherApp.list');
			});
		}
		$scope.menuItems = [
			{title: 'Locations List', sref: 'weatherApp.list.locations'},
			{title: 'Comments List', sref: 'weatherApp.list'},
			{title: 'Sign In', sref: 'weatherApp.signIn'}
		];
	}]);