var app = angular.module('weatherApp', [
	'ngResource',
	'ngRoute',
	'ui.router',
	'ngSlider',
	'weather',
	'weather.comments',
	'uiGmapgoogle-maps'
]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('weatherApp', {
		url: '',
		abstract: true
	});
	// .state('weather.list', {
	// 	url: '/',
	// 	views: {
	// 		'weather-map@' : {
	// 			controller: 'WeatherMapCtrl',
	// 			templateUrl: '/app/weather-map/weather-map.html'
	// 		},
	// 		'comments@' : {
	// 			controller: 'ListCommentsCtrl',
	// 			templateUrl: '/app/comments/list.html'
	// 		}
	// 	}
	// }).state('weather.newComment', {
	// 	url: '/new-comment',
	// 	views: {
	// 		'comments@' : {
	// 			controller: 'CreateCommentCtrl',
	// 			templateUrl: '/app/comments/create/create-comment.html'
	// 		}
	// 	}
	// });
	$urlRouterProvider.otherwise('/');
}]);

