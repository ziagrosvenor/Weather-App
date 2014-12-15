angular.module('weather.locations', [
	'ngAnimate',
	'nearestLocationCtrl',
	'weather',
	'app.models.weather',
	'locations.list'
	])
	.config(function ($stateProvider){
		// Provides route for list locations view
		$stateProvider
			.state('weatherApp.weather.list', {
				url: '/locations',
				views: {
					'locations@' : {
						controller: 'ListLocationsCtrl',
						templateUrl: '/app/weather-map/locations/list-locations/list-locations.html'
					}
				}
			})
		;
	});