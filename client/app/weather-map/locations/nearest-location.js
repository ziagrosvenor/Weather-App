angular.module('weather.locations', [
	'ngAnimate',
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
	})
	.controller('nearestLocationCtrl', ['$scope', 'weatherFactory', '$http', '$filter' , function ($scope, weatherFactory, $http, $filter) {
		// Gets weather data and then calls geo location function
		weatherFactory.getWeather().success( function (data, status, headers, config) {
    		$scope.weather = data;
    		getGeoLocation();
  		});

		// Menu items
		$scope.menuItems = [
			{title: 'Local Weather', sref: 'weatherApp.weather'},
			{title: 'Locations List', sref: 'weatherApp.weather.list'},
			{title: 'Info', sref: 'weatherApp.weather.info'}
		];

		// Gets user location
		function getGeoLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(findNearest);
			}
		}

		// Compares user location to list of possible weather stations
		// Returns local weather station binded to scope
		function findNearest(position) {
			userLocation = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			};

			var locationsToSearch = {};
			var allLocations = $scope.weather;
			var outputLocation;

			for(var i = 0; i < allLocations.length; i++) {
				weatherLocation = {
					latitude: allLocations[i].lat,
					longitude: allLocations[i].lng
				};

				locationsToSearch[allLocations[i].location] = weatherLocation;
			}

			var nearestWeatherLocation = geolib.findNearest(userLocation, locationsToSearch, 1);
			
			angular.forEach($scope.weather, function(location) {
				if(location.location === nearestWeatherLocation.key) {
					outputLocation = location;
				}
			});

			$scope.localWeather = outputLocation;

			makeChart($scope.localWeather);

			return $scope.localWeather;
		}

		// Creates bar chart with data for a single weather locations
		function makeChart (dataset) {
			var days = [];
			var rainChance = [];
			var periods = {};

			angular.forEach(dataset.period, function (period, i) {
				days.push(dataset.period[i].date);
				rainChance.push(dataset.period[i].dayTime.rainChance);
				console.log(periods);
			});

			periods.days = days;
			periods.rainChance = rainChance;

			var margin = {top: 20, right: 20, bottom: 50, left: 50};
			var w = 400 - margin.left - margin.right, 
				h = 300 - margin.top - margin.bottom;

			var svg = d3.select('#barchart').append('svg')
				.attr('width', w + margin.left + margin.right)
				.attr('height', h + margin.top + margin.bottom)
				.append('g')
				.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

			var xScale = d3.scale.linear()
				.domain([0.5, 5.5])
				.range([0, w]);

			var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom')
				.ticks(5)
				.innerTickSize(1)
				.outerTickSize(8)
				.tickPadding(20)
				.tickFormat( function (d, i) {
					return $filter('date')(periods.days[i], 'EEE');
				});

			svg.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0 ' + (h) + ')')
				.call(xAxis);

			var yScale = d3.scale.linear()
				.domain([0, 100])
				.range([0, h]);

			var yAxisScale = d3.scale.linear()
				.domain([0, 100])
				.range([h, 0]);

			var yAxis = d3.svg.axis()
				.scale(yAxisScale)
				.orient('left')
				.ticks(5)
				.innerTickSize(4)
				.outerTickSize(8)
				.tickFormat( function (d) {
					return d + '%';
				});

			svg.append('g')
				.attr('class', 'y axis')
				.attr('transform', 'translate(0, 0)')
				.call(yAxis);

			var colorScale = d3.scale.linear()
				.domain([0, d3.max(periods.rainChance)])
				.range(['#AAEAFF', '#00C0FF']);

			svg.selectAll('rect')
				.data(periods.rainChance)
				.enter()
				.append('rect')
				.attr('class', 'bar')
				.attr('fill', colorScale)
				.attr('x', function (d, i) {
					return (i * w / 5) + 4;
				})
				.attr('y', h)
				.attr('width', (w / 5) - 4)
				.attr('height', 0)
				.transition()
				.duration(500)
				.attr('y', function (d) {
					return h - yScale(d);
				})
				.attr('height', function (d) {
					return yScale(d);
				});

			return svg;
		}
	}])
	// Directive handles state of UI controls
	.directive('menuItem', function () {
        var controller = function ($scope) {
            $scope.active = false;
            $scope.select = false;
        };

        return {
            scope: true,
            controller: controller
        };
    })
    // Reveals UI controls on click
    .animation('.menu-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                if(className == 'highlight') {
                    TweenLite.to(element, 0.2, {
                        right: '-230px',
                        onComplete: done
                    });
                }
                if(className == 'selected') {
                    TweenLite.to(element, 0.2, {
                        right: '0',
                        onComplete: done
                    });
                }
                else {
                    done();
                }
            },
            beforeRemoveClass: function (element, className, done) {
                if(className == 'highlight') {
                    TweenLite.to(element, 0.4, {
                        right: '-240px',
                        onComplete: done
                    });
                }
                if(className == 'selected') {
                    TweenLite.to(element, 0.2, {
                        right: '-240px',
                        onComplete: done
                    });
                }
                else {
                    done();
                }
            }
        };
    });