var app = angular.module('bitmamaCorsoAngular', ['bitmamaDataProvider']);

app.controller('mainCtrl', function ($scope, addressBook) {
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