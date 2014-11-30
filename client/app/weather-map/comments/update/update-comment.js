angular.module('comments.update', [])
	.controller('EditComment', ['$scope', '$routeParams', 'commentsFactory', 
	function ($scope, $routeParams, commentsFactory) {
		$scope.comments = commentsFactory.query();
		$scope.whichItem = $routeParams.itemId;

		$scope.updateComment = function(i) {
			var id = $scope.comments[i]._id;
			console.log(id);
			
			commentsFactory.update({commentId: id}, $scope.comments[i], function (result) {
				console.log(result);
			});
		};
	}]);