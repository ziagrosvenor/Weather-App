angular.module('locations.list', [
    'app.models.weather'
    ])
    .controller('ListLocationsCtrl', ['$scope', 'weatherFactory', function ($scope, weatherFactory) {
        weatherFactory.getWeather().success( function (data, err) {
            $scope.weather = data;
        });

        $scope.menuItems = [
        	{title: 'Comments List', sref: 'weatherApp.list'},
			{title: 'Add a Comment', sref: 'weatherApp.list.create'},
			{title: 'Sign In', sref: 'weatherApp.signIn'}
		];

        $scope.listIndex = 0;
        
        $scope.listCycle = function (isNext) {
			var index = $scope.listIndex;

			if(isNext === true) {
				if(index != $scope.weather.length - 1) {
					console.log(index);
					$scope.listIndex = $scope.listIndex + 1;
				}
			}

			else if (isNext === false) {
				if(index != 0) {
					console.log(index);
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
    .filter('slice', function() {
  		return function(arr, start, end) {
   			 return arr.slice(start, end);
  		};
	});