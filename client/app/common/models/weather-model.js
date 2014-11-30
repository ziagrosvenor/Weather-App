angular.module('app.models.weather', [])
	.factory('weatherFactory', function ($resource) {
		return $resource('/api/weather/:period', 
			{ period: '@period'}
		);
	});