angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here
  $scope.link = {};

  $scope.addLink = function() {
    $scope.loading = false;
    Links.postNewLink($scope.url).then(function() {
      $location.path('/links');
    });
  };

  $scope.submitForm = function(isValid) {
    console.log("in submitForm");

    if (isValid) {
      console.log("form is valid");
      console.log($scope.url);
      $scope.addLink();
    }
  };
});
