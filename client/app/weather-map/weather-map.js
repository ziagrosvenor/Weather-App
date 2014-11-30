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
	.controller('WeatherMapCtrl', ['$scope', 'weatherFactory' , function ($scope, weatherFactory) {
		$scope.map = {
			center: {
				latitude: 51.468489,
				longitude: -2.5907094
			},
			zoom: 8,
			options: {scrollwheel: false}
		};

		$scope.infowindow = false;
		$scope.markers = [];
		$scope.options = {scrollwheel: false};
		$scope.value = "1";
		$scope.options = {
			from: 0,
			to: 9,
			step: 1,
			round: 1,
		};
	
		function getWeatherData () {
			if(!$scope.period){
				$scope.period = 1;
			}

			weatherFactory.getWeather().success( function (data, status, headers, config) {
    			setWeatherMap(data);
  			});
		}

		function isEven(value){
			if (value%2 === 0)
				return true;
			else
				return false;
		}

  		function setWeatherMap (data) {
			if(data) {
				$scope.weather = data;
			}
  			$scope.markers = [];
			var sliderValue = $scope.period;
  			var markersTemp = [];
			var weatherPeriods = [];

			if (isEven(sliderValue) === true) {
				sliderValue = (sliderValue / 2);
			}
			else {
				sliderValue = ((sliderValue - 1) / 2);
			}

			for(var i = 0; i < 75; i++) {

				if(isEven(sliderValue))
				{
					var location = $scope.weather[i].location;
					weatherPeriod = {
						location: location ,
						lat: $scope.weather[i].lat,
						lng: $scope.weather[i].lng,
						icon: $scope.weather[i].period[sliderValue].dayTime.weatherType,
						temp: $scope.weather[i].period[sliderValue].dayTime.temp,
						date: $scope.weather[i].period[sliderValue].date
					};
				}
				else {
					weatherPeriod = {
						location: $scope.weather[i].location,
						lat: $scope.weather[i].lat,
						lng: $scope.weather[i].lng,
						icon: $scope.weather[i].period[sliderValue].nightTime.weatherType,
						temp: $scope.weather[i].period[sliderValue].nightTime.temp,
						date: $scope.weather[i].period[sliderValue].date
					};
				}
				weatherPeriods.push(weatherPeriod);
			}

  			for(i = 0; i < weatherPeriods.length; i++) {
				icon = weatherPeriods[i].icon;
				title = 'm' + i;

				var marker = {
					id: i,
					latitude: weatherPeriods[i].lat,
       				longitude: weatherPeriods[i].lng,
       				icon: '/assets/weather-icons/w'+ icon +'.png',
       				title: title,
       				location: weatherPeriods[i].location,
       				temp: weatherPeriods[i].temp,
       				date: weatherPeriods[i].date
				};

				markersTemp.push(marker);
				$scope.markers = markersTemp;
				console.log($scope.markers[i].location);
			}
  		}

		getWeatherData();

		$scope.$watch('period', function (newValue, oldValue) {
			setWeatherMap();
		});
	}]);