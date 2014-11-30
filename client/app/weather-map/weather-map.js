angular.module('weather', [
		'ngSlider', 
		'uiGmapgoogle-maps',
		'app.models.weather'
	])
	.config(function ($stateProvider){
		$stateProvider
			.state('weatherApp.list', {
				url: '/',
				views: {
					'weather-map@': {
						controller: 'WeatherMapCtrl',
						templateUrl: '/app/weather-map/weather-map.html'
					},
					'comments@': {
						controller: 'ListCommentsCtrl',
						templateUrl: '/app/weather-map/comments/list.html'
					}
				}
			})
		;
	})
	.controller('WeatherMapCtrl', ['$scope', 'weatherFactory', '$http' , function ($scope, commentsFactory, $http) {
		$scope.map = {
			center: {
				latitude: 51.468489,
				longitude: -2.5907094
			},
			zoom: 8,
			options: {scrollwheel: false}
		};

		$scope.weather;
		$scope.infowindow = false;
		$scope.markers = [];
		$scope.options = {scrollwheel: false};
		$scope.period;
	
		$scope.$watch('period', function (newValue, oldValue) {
			console.log(newValue);
			getWeatherData();
		});
	
		function getWeatherData () {
			if(!$scope.period){
				$scope.period = 1;
			}
	
			$http.get('/api/weather/' + $scope.period).success( function (data, status, headers, config) {
    			setWeatherMap(data);
  			});
		}

  		function setWeatherMap (data) {
  			$scope.weather = data;
  			$scope.markers = [];
  			var markersTemp = [];

  			console.log(data);
  		
  			for(var i = 0; i < $scope.weather.length; i++) {
				icon = $scope.weather[i].icon;
				title = 'm' + i;

				var marker = {
					latitude: $scope.weather[i].lat,
       				longitude: $scope.weather[i].lng,
       				icon: '/assets/weather-icons/w'+ icon +'.png',
       				title: title,
       				location: $scope.weather[i].location,
       				temp: $scope.weather[i].temp,
       				date: $scope.weather[i].date
				};

				marker['id'] = i;
				markersTemp.push(marker);

				$scope.markers = markersTemp;
			}
  		}
  		
  		getWeatherData();
	
		$scope.value = "1";

		$scope.options = {				
			from: 0,
			to: 9,
			step: 1,
			round: 1,
		};
	}]);	
	
		