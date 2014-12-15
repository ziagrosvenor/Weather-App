angular.module('weatherMapCtrl', [
	])
	.controller('WeatherMapCtrl', ['$scope', '$http' , function ($scope, $http) {
		// Configuration for map
		$scope.map = {
			center: {
				latitude: 51.468489,
				longitude: -2.5907094
			},
			zoom: 7,
			options: {scrollwheel: false, optimized: true}
		};

		// Defines variables on scope used in map and slider
		$scope.infowindow = false;
		$scope.value = "1";
		$scope.options = {
			from: 0,
			to: 9,
			step: 1,
			round: 1,
		};
		$scope.period = 1;
		
		$scope.weather = {};

		// Requests weather data from server 
		function getWeatherData () {
			$http.get('/api/weather/').success(function (data) {
				 populateMap(data);
			});
		}

		// // Check if value supplied in argument is an even number
		$scope.isEven = function (value){
			if (value%2 === 0)
				return true;
			else
				return false;
		};

		// // Loops through weather data and assigns it to scope.weatherMarkers
  		function populateMap (data) {
  			if (data)
  				$scope.weather = data;
			var isEven = $scope.isEven;
  			$scope.weatherMarkers = [];
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
					weatherPeriod = {
						location: $scope.weather[i].location,
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
				$scope.weatherMarkers = markersTemp;
			}

			return $scope.weatherMarkers;
  		}

		getWeatherData();

		// Watches for changes to UI sliders scope, callback updates map
		$scope.$watch('period', function (newValue, oldValue) {
			populateMap();
		});
	}]);