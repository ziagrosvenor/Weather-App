app.controller('commentsController', ['$scope', 'resource', 
	function ($scope, $resource) {
		$scope.comments = {}

	$scope.createComment = function () {
		$scope.commentsCount = 1;
	}
}]);
