angular.module('weather.comments', [
	'ngAnimate',
	'app.models.comments',
	'app.models.weather',
	'comments.create',
	'comments.update',
	'comments.locations'
	])
	.config(function ($stateProvider){
		$stateProvider
			.state('weatherApp.list.create', {
				url: '/new-comment',
				views: {
					'comments@' : {
						controller: 'CreateCommentCtrl',
						templateUrl: '/app/weather-map/comments/create/create-comment.html'
					}
				}
			})
			.state('weatherApp.list.locations', {
				url: '/locations',
				views: {
					'comments@' : {
						controller: 'ListLocationsCtrl',
						templateUrl: '/app/weather-map/comments/locations/locations.html'
					}
				}
			})
		;
	})
	.controller('ListCommentsCtrl', ['$scope', 'commentsFactory', '$http' , function ($scope, commentsFactory, $http) {
		$scope.comments = commentsFactory.query();
		$scope.menuItems = [
			{title: 'Add a Comment', sref: 'weatherApp.list.create'},
			{title: 'Locations List', sref: 'weatherApp.list.locations'},
			{title: 'Sign In', sref: 'weatherApp.signIn'}
		];

		$scope.listIndex = 0;

		$scope.listCycle = function (isNext) {
			var index = $scope.listIndex;
			
			if(isNext === true) {
				if(index != $scope.comments.length - 1) {
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
		}

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
				console.log(result);
			});
		};
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


