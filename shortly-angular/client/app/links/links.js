angular.module('shortly.links', [])
.controller('LinksController', function ($scope, Links) {
  $scope.data = {};
  $scope.getLinks = function() {
    Links.getAllLinks().then(function(links) {
      $scope.data.links = links;
      console.log("links: ", $scope.data.links);
    });
  };

  $scope.getLinks();
});
