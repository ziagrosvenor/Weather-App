angular.module('weatherMapCtrl', [
	])
	.controller('WeatherMapCtrl', ['$scope', '$http' , function ($scope, $http) {
		var donut = this;
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
		$scope.options = {
			from: 2,
			to: 11,
			step: 1,
			round: 1,
		};

		// Initial value for slider
		$scope.period = 2;

		// Requests weather data from server 
		function getWeatherData () {
			$http.get('/api/weather/').success(function (data) {
				$scope.weather = data;
				$scope.weatherMarkers = populateMap(isEven, $scope.period, $scope.weather);
			});
		}

		$scope.calcAverages = function (data, country, doRebuild) {	
			$scope.$watch('weatherMarkers', function (newValue, oldValue) {
				var averageTemp = 0;
				var rainChance = 0;
				var windSpeed = 0;
				var temp = [];
				var rain = [];
				var speed = [];

				angular.forEach(newValue, function (weather) {
					if(weather.country === country.toUpperCase() ) {
						temp.push(parseInt(weather.temp));
						rain.push(weather.rainChance);
						speed.push(weather.windSpeed);
					}
				});

				for(var i = 0; i < temp.length; i++) {
					averageTemp += temp[i];
					rainChance += rain[i];
					windSpeed += speed[i];
				}

				var count = parseInt(temp.length);
				averageTemp = averageTemp / count;
				rainChance = rainChance / count;
				windSpeed = windSpeed / count;

				var averages = [averageTemp, rainChance, windSpeed];
				makePie(averages, country, doRebuild);
 			});

		};

		function updatePie (data) {
			$scope.calcAverages(data, 'england', true);
			$scope.calcAverages(data, 'wales', true);
			$scope.calcAverages(data, 'scotland', true);
		}

		getWeatherData();

		// Watches for changes to UI sliders scope, callback updates map
		$scope.$watch('period', function (newValue, oldValue) {
			$scope.weatherMarkers = populateMap(isEven, $scope.period, $scope.weather);
			updatePie($scope.weatherMarkers);
		});
	}]);