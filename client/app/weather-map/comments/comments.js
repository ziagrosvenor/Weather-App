angular.module('weather.comments', [
	'app.models.comments',
	'app.models.weather',
	'comments.create',
	'comments.update',
	'ngAnimate'
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
		;
	})
	.controller('ListCommentsCtrl', ['$scope', 'commentsFactory', '$http' , function ($scope, commentsFactory, $http) {
		$scope.comments = commentsFactory.query();

		$scope.menuItems = [
			{title: 'Add a Comment', sref: 'weatherApp.list.create'},
			{title: 'Locations List', sref: 'weatherApp.list.weather'},
			{title: 'Sign In', sref: 'weatherApp.signIn'}
		];

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
	.directive('menuItem', function () {
		var controller = function ($scope) {
			$scope.active = false;
			$scope.select = false;
		};

		return {
			scope: true,
			controller: controller
		}
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
		}
	})


