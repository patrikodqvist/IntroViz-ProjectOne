var projectOne = angular.module('projectOne', ['ngRoute','ngResource','zingchart-angularjs']);

projectOne.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.
	when('/start', {
		controller: 'startCtrl',
		templateUrl: 'partials/start.html',
		resolve: {
			titles: function(Data) {
				Data.formatData();
			}
		}
	}).
	when('/home', {
		controller: 'homeCtrl',
		templateUrl: 'partials/home.html',
		
	}).
	when('/detailView', {
		controller: 'detailViewCtrl',
		templateUrl: 'partials/detail.html'
	}).
	otherwise('/start', {
		controller: 'startCtrl',
		templateUrl: 'partials/start.html'
	});
}]);