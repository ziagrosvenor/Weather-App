var commentsController = angular.module('commentsController', ['ngAnimate', 'ngSlider', 'uiGmapgoogle-maps']);

commentsController.controller('ListController', ['$scope', 'commentsFactory', '$http' , function ($scope, commentsFactory, $http) {

	$scope.comments = commentsFactory.query();

	$scope.postComment = function() {
		var newComment = new commentsFactory();
		newComment.title = $scope.addTitle;
		newComment.content = $scope.addContent;
		$scope.addContent = "";
		$scope.addTitle = "";

		newComment.$save( function (result) {
			$scope.comments.push(result);
		});
	};

	$scope.map = {
		center: {
			latitude: 51.468489,
			longitude: -2.5907094
		},
		zoom: 8,
		options: {scrollwheel: false}
	};

	$scope.weather;
	$scope.infowindow = false;
	$scope.markers = [];
	$scope.options = {scrollwheel: false};
	$scope.period;

	$scope.$watch('period', function (newValue, oldValue) {
		console.log(newValue);
		getWeatherData();
	});
	
	function getWeatherData () {
		if(!$scope.period){
			$scope.period = 1;
		}

		$http.get('/api/weather/' + $scope.period).success( function (data, status, headers, config) {
    		setWeatherMap(data);
  		});
	}

  	function setWeatherMap (data) {
  		$scope.weather = data;
  		$scope.markers = [];
  		var markersTemp = [];

  		console.log(data);
  		
  		for(var i = 0; i < $scope.weather.length; i++) {
			icon = $scope.weather[i].icon;
			title = 'm' + i;

			var marker = {
				latitude: $scope.weather[i].lat,
       			longitude: $scope.weather[i].lng,
       			icon: '/weather-icons/w'+ icon +'.png',
       			title: title,
       			location: $scope.weather[i].location,
       			temp: $scope.weather[i].temp,
       			date: $scope.weather[i].date
			};

			marker['id'] = i;
			markersTemp.push(marker);

			$scope.markers = markersTemp;

		}

		
  	}
  	getWeatherData();

	$scope.value = "1";

	$scope.options = {				
		from: 0,
		to: 9,
		step: 1,
		round: 1,
	};

	$scope.removeComments = function() {
		var oldComments = $scope.comments;
		$scope.comments = [];
		commentsSelected = {
			_id: [

			]
		};

		angular.forEach(oldComments, function (comment) {
			if(comment.selected) commentsSelected._id.push(comment._id);
			if(!comment.selected) $scope.comments.push(comment);
		});
		
		commentsFactory.delete(commentsSelected, function (result) {
			
		});
	};
}]);

commentsController.controller('EditController', ['$scope', '$routeParams', 'commentsFactory', 
	function ($scope, $routeParams, commentsFactory) {
		$scope.comments = commentsFactory.query();
		$scope.whichItem = $routeParams.itemId;

		$scope.updateComment = function(i) {
			var id = $scope.comments[i]._id;
			console.log(id);
			
			commentsFactory.update({commentId: id}, $scope.comments[i], function (result) {
				console.log(result);
			});
		};
	}]);