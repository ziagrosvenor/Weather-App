var app = angular.module('eventsApp', ['ngResource']);

app.factory('commentsFactory', function ($resource) {

	return $resource('/api/comments/:commentId', 
		{ commentId: '@_id' },
		{ update: {method: 'PUT'}}
	);

});

app.controller('CommentsController', function ($scope, $location, commentsFactory) {

	$scope.comments = commentsFactory.query();

	$scope.addComment = function() {
		var comment = new commentsFactory();
		console.log($scope.commentTitle);
		comment.title = $scope.commentTitle;
		comment.content = $scope.commentContent;

		comment.$save( function (result) {
			$scope.comments.push(result);
		});
		
	};

	$scope.updateComment = function(i) {
		var id = $scope.comments[i]._id;
		commentsFactory.update({commentId: id}, $scope.comments[i], function (result) {
			$scope.comments.push(result);
		});
	};

	$scope.removeComments = function() {
		comments = $scope.comments;
		commentsSelected = {
			'ids': [
				{ 'id': String }
			]
		};

		var ids = JSON.parse(commentsSelected).ids;

		angular.forEach(comments, function (comment) {
			if(comment.selected) ids.push({id: comment._id});
		});
		
		console.log(ids);
		commentsFactory.delete(commentsSelected, function (result) {
			$scope.comments.push(result);
		});
	};
});