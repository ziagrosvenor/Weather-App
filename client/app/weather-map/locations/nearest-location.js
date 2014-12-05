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
	.controller('nearestLocationCtrl', ['$scope', 'weatherFactory', '$http' , function ($scope, weatherFactory, $http) {
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

			console.log($scope.localWeather);
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