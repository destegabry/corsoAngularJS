var app = angular.module('bitmamaCorsoAngular', ['bitmamaDataProvider', 'ui.bootstrap']);

app.controller('mainCtrl', function ($scope, addressBook) {

  $scope.orderBy = function (predicate) {
    $scope.reverse = $scope.orderPredicate !== predicate ? false : !$scope.reverse;
    $scope.orderPredicate = predicate;
  }

  addressBook.get()
    .then(function (addrBook) {
      $scope.newPerson = {};
      $scope.addrBook = addrBook;
    }, function (error) {
      $scope.error = {
        msg: 'Unexpected error',
        raw: error
      };
    });

  $scope.addPerson = function (person) {
    $scope.addrBook.push(person);
    $scope.newPerson = {};
  }
});