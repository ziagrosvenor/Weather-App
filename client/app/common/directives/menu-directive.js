angular.module('menuItem', [])
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