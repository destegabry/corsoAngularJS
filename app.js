var app = angular.module('bitmamaCorsoAngular', ['bitmamaDataProvider']);

app.controller('mainCtrl', function ($scope, addressBook) {
  addressBook.get()
    .then(function (addrBook) {
      $scope.addrBook = addrBook;
    }, function (error) {
      $scope.error = {
        msg: 'Unexpected error',
        raw: error
      };
    });
});