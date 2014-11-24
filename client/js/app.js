var app = angular.module('eventsApp', [
	'ngResource',
	'ngRoute',
	'commentsController'
]);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
	when('/list', {
		templateUrl: '/views/html/list.html',
		controller: 'ListController'
	}).
	when('/edit/:itemId', {
		templateUrl: '/views/html/edit.html',
		controller: 'EditController'
	}).
	when('/add', {
		templateUrl: '/views/html/add.html',
		controller: 'AddController'
	}).
	otherwise({
		redirectTo: '/list'
	});
}]);

app.factory('commentsFactory', function ($resource) {

	return $resource('/api/comments/:commentId', 
		{ commentId: '@_id' },
		{ update: {method: 'PUT'}}
	);

});