angular.module('locations.list', [
    'app.models.weather'
    ])
    .controller('ListLocationsCtrl', ['$scope', 'weatherFactory', function ($scope, weatherFactory) {
        weatherFactory.getWeather().success( function (data, err) {
            $scope.weather = data;
        });

        // UI menu items
        $scope.menuItems = [
        	{title: 'Local Weather', sref: 'weatherApp.weather'},
        	{title: 'Locations List', sref: 'weatherApp.weather.list'},
			{title: 'Info', sref: 'weatherApp.weather.Info'}
		];

		// Used to store index of weather locations in list view
        $scope.listIndex = 0;
        
        // Controls cycling through locations list
        $scope.listCycle = function (isNext) {
			var index = $scope.listIndex;

			if(isNext === true) {
				if(index != $scope.weather.length - 1) {
					$scope.listIndex = $scope.listIndex + 1;
				}
			}

			else if (isNext === false) {
				if(index != 0) {
					$scope.listIndex = $scope.listIndex - 1;
				}
			}

			$scope.listIndexMax = $scope.listIndex + 2;

			if($scope.select === true) {
				$scope.listIndex = 0;
				$scope.listIndexMax = 150;
			}
		}
    }])
	// Filter used by locations list
    .filter('slice', function() {
  		return function(arr, start, end) {
   			 return arr.slice(start, end);
  		};
	});