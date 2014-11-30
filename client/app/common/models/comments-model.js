angular.module('app.models.comments', [])
	.factory('commentsFactory', function ($resource) {
	return $resource('/api/comments/:commentId', 
		{ commentId: '@_id' },
		{ update: {method: 'PUT'}}
	);
});

