angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here
  $scope.link = {};

  $scope.addLink = function($event) {
    $scope.loading = false;
    Links.postNewLink($scope.url).then(function() {
      $location.path('/links');
    })

  };

});
