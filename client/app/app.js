var app = angular.module('weatherApp', [
	'ngResource',
	'ngRoute',
	'ui.router',
	'ngSlider',
	'weather',
	'weather.locations',
	'uiGmapgoogle-maps'
]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('weatherApp', {
		url: '',
		abstract: true
	});
	
	$urlRouterProvider.otherwise('/');
}]);