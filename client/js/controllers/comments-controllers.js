var commentsController = angular.module('commentsController', ['ngAnimate']);

commentsController.controller('ListController', ['$scope', 'commentsFactory', function ($scope, commentsFactory) {

	$scope.comments = commentsFactory.query();

	$scope.postComment = function() {
		var newComment = new commentsFactory();
		newComment.title = $scope.addTitle;
		newComment.content = $scope.addContent;
		$scope.addContent = "";
		$scope.addTitle = "";
		newComment.$save( function (result) {
			$scope.comments.push(result);
		});
	};
	$scope.slider = {
		'options': {
			start: function (event, ui) { $log.info('Event: Slider start - set with slider options', event); },
    		stop: function (event, ui) { $log.info('Event: Slider stop - set with slider options', event); }
		}
	}
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
			
		});
	};
}]);

commentsController.controller('EditController', ['$scope', '$routeParams', 'commentsFactory', 
	function ($scope, $routeParams, commentsFactory) {
		$scope.comments = commentsFactory.query();
		$scope.whichItem = $routeParams.itemId;

		$scope.updateComment = function(i) {
			var id = $scope.comments[i]._id;
			console.log(id);
			commentsFactory.update({commentId: id}, $scope.comments[i], function (result) {
			console.log(result);
			// $scope.comments.push(result);
			});
		};
	}]);