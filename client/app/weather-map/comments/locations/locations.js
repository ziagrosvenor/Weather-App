angular.module('comments.locations', [
    'weather.comments',
    'app.models.weather'
    ])
    .controller('ListLocationsCtrl', ['$scope', 'weatherFactory', function ($scope, weatherFactory) {
        weatherFactory.getWeather().success( function (data, err) {
            $scope.weather = data;
        });
    }]);