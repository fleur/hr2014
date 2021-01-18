angular.module('curates.collectionsList', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('collectionsList', {
    url: '/',
    templateUrl: 'modules/collectionsList/collectionsList.html'
  });
})
.controller('collectionsListController', function($scope, collectionFactory) {
  collectionFactory.getListData().then(function(data) {
    console.log(data.collections);
    $scope.listData = data.collections;
  });
});
