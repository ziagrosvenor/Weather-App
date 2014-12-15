describe("Controller: WeatherMapCtrl", function() {

	var WeatherMapCtrl,
		scope;

	beforeEach(module('weatherMapCtrl'));
	beforeEach(module('app.models.weather'));

	beforeEach(inject(function ($rootScope, $controller ) {

	  	scope = $rootScope.$new();

	  	WeatherMapCtrl = $controller("WeatherMapCtrl", {
	  		$scope: scope
	  	});

	  	;
  	}));

	it("will return true if argument is even", function () {
		expect(scope.isEven(2)).toEqual(true);
	});
});

describe("Controller: NearestLocationCtrl", function() {

	var WeatherMapCtrl,
		scope;

	beforeEach(module('nearestLocationCtrl'));
	beforeEach(module('app.models.weather'));

	beforeEach(inject(function ($rootScope, $controller, $httpBackend ) {

	  	scope = $rootScope.$new();

	  	WeatherMapCtrl = $controller("nearestLocationCtrl", {
	  		$scope: scope
	  	});

	  	;
  	}));

	it("will return true if argument is even", function () {
		expect(scope.menuItems.length).toEqual(3);
	});
});