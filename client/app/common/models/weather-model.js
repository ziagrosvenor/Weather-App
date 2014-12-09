// Returns weather data as JSON object form server
angular.module('app.models.weather', [])
	.factory('weatherFactory', function ($http) {
		return {
			getWeather: function() {
				return $http.get('/api/weather');
			}
		};
	});