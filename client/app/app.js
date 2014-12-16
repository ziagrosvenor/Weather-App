// Defines app, requires modules
var app = angular.module('weatherApp', [
	'ngResource',
	'ngRoute',
	'ui.router',
	'ngSlider',
	'uiGmapgoogle-maps',
	'donutChart',
	'menuItem',
	'weather',
	'weather.locations'
]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('weatherApp', {
		url: '',
		abstract: true
	});
	
	$urlRouterProvider.otherwise('/');
}]);