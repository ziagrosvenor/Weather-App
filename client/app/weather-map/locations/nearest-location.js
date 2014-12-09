angular.module('weather.locations', [
	'ngAnimate',
	'app.models.weather',
	'locations.list'
	])
	.config(function ($stateProvider){
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
		weatherFactory.getWeather().success( function (data, status, headers, config) {
    		$scope.weather = data;
  		});

		$scope.menuItems = [
			{title: 'Locations List', sref: 'weatherApp.weather.list'},
			{title: 'More Info', sref: 'weatherApp.weather.info'},
			{title: 'Contact', sref: 'weatherApp.weather.contact'}
		];

		function getGeoLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(findNearest);
			}
		}

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

		function makeChart (dataset) {
			var days = [];
			var rainChance = [];
			var periods = {};

			angular.forEach(dataset.period, function (period, i) {
				days.push(dataset.period[i].date);
				rainChance.push(dataset.period[i].dayTime.rainChance);
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

			var xScale = d3.scale.ordinal()
				.domain(periods.rainChance)
				.rangeBands([0, w], 0.1, 0.1);

			var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom')
				.ticks(5)
				.innerTickSize(6)
				.outerTickSize(8)
				.tickPadding(12)
				.tickFormat(function (d, i) {
					return $filter('date')(periods.days[i], 'EEE');
				});

			svg.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0 ' + (h) + ')')
				.call(xAxis);

			var yScale = d3.scale.linear()
				.domain([0, d3.max(periods.rainChance) * 1.1])
				.range([0, h]);

			var colorScale = d3.scale.linear()
				.domain([0, d3.max(periods.rainChance)])
				.range(['yellow', 'tomato']);

			svg.selectAll('rect')
				.data(periods.rainChance)
				.enter()
				.append('rect')
				.attr('class', 'bar')
				.attr('fill', colorScale)
				.attr('x', function (d, i) {
					return xScale(d);
				})
				.attr('y', h)
				.attr('width', xScale.rangeBand())
				.attr('height', 0)
				.transition()
				.duration(500)
				.attr('y', function (d) {
					return h - yScale(d);
				})
				.attr('height', function (d) {
					return yScale(d);
				});
		}
		getGeoLocation();

	}])
	.filter('slice', function() {
  		return function(arr, start, end) {
   			 return arr.slice(start, end);
  		};
	})
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