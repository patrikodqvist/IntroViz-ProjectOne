projectOne.controller('startCtrl', ['$scope','$rootScope','Data','$window', function($scope,$rootScope,Data,$window) {
   $scope.start = function() {
        $window.location.href="#!/home";
   }
}]);