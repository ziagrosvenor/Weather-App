angular.module("donutChart", [
	])
	.directive("donut", function donutChart () {
		return {
			scope: {
				country: "@",
				data: "@"
			},
			bindToController: true,
			myDirective: '&',
			controller: "WeatherMapCtrl as donut",
			template: "<div ng-init='myDirective(donut.data, donut.country, false)'><div id='{{donut.country}}'></div><h3>{{donut.country}}</h3></div>"
		}
	});