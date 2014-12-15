angular.module('weather', [
		'weatherMapCtrl',
		'ngSlider', 
		'uiGmapgoogle-maps',
		'app.models.weather'
	])
	.config(function ($stateProvider){
	// Defines default views
		$stateProvider
			.state('weatherApp.weather', {
				url: '/',
				views: {
					'weather-map@': {
						controller: 'WeatherMapCtrl',
						templateUrl: '/app/weather-map/weather-map.html'
					},
					'locations@': {
						controller: 'nearestLocationCtrl',
						templateUrl: '/app/weather-map/locations/nearest-location.html'
					}
				}
			})
		;
	});