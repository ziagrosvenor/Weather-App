angular.module('comments.locations', [
    'weather.comments',
    'app.models.weather'
    ])
    .controller('ListLocationsCtrl', ['$scope', 'weatherFactory', function ($scope, weatherFactory) {
        weatherFactory.getWeather().success( function (data, err) {
            $scope.weather = data;
            console.log(data[0]);
        });

        $scope.listIndex = 0;
        
        $scope.listCycle = function (isNext) {
			var index = $scope.listIndex;

			if(isNext === true) {
				if(index != $scope.weather.length - 1) {
					console.log(index);
					$scope.listIndex = $scope.listIndex + 1;
				}
			}
			if(isNext === false) {
				if(index != 0) {
					console.log(index);
					$scope.listIndex = $scope.listIndex - 1;
				}
			}
			$scope.listIndexMax = $scope.listIndex + 3;
			if($scope.active === true) {
				$scope.listIndex = 0;
				$scope.listIndexMax = $scope.weather.length;
			}
		}
    }])
    .filter('slice', function() {
  		return function(arr, start, end) {
   			 return arr.slice(start, end);
  		};
	});