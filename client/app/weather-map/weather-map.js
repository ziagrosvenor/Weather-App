angular.module('weatherMapCtrl', [
	'donutChart'
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

		$scope.myDirective = function (data, country) {	
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
				makePie(averages, country);
 			});

			function makePie (data, country) {
				var width = 300,
			    height = 300,
			    radius = Math.min(width, height) / 2;

				var color = d3.scale.category20();

				var pie = d3.layout.pie()
				    .sort(null);

				var arc = d3.svg.arc()
				    .innerRadius(radius - 90)
				    .outerRadius(radius - 50);

				var svg = d3.select("#" + country).append("svg")
				    .attr("width", width)
				    .attr("height", height)
				    .append("g")
				    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

				var path = svg.selectAll("path")
				    .data(pie(data))
				    .enter().append("path")
				    .attr("fill", function(d, i) { return color(i); })
				    .attr("d", arc);
			}
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
						country: $scope.weather[i].country,
						lat: $scope.weather[i].lat,
						lng: $scope.weather[i].lng,
						icon: $scope.weather[i].period[sliderValue].dayTime.weatherType,
						rainChance: $scope.weather[i].period[sliderValue].dayTime.rainChance,
						windSpeed: $scope.weather[i].period[sliderValue].dayTime.windSpeed,
						temp: $scope.weather[i].period[sliderValue].dayTime.temp,
						date: $scope.weather[i].period[sliderValue].date
					};
				}
				else {
					weatherPeriod = {
						location: $scope.weather[i].location,
						country: $scope.weather[i].country,
						lat: $scope.weather[i].lat,
						lng: $scope.weather[i].lng,
						icon: $scope.weather[i].period[sliderValue].nightTime.weatherType,
						rainChance: $scope.weather[i].period[sliderValue].dayTime.rainChance,
						windSpeed: $scope.weather[i].period[sliderValue].dayTime.windSpeed,
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
       				country: weatherPeriods[i].country,
       				temp: weatherPeriods[i].temp,
       				rainChance: weatherPeriods[i].rainChance,
       				windSpeed: weatherPeriods[i].windSpeed,
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