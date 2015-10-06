var app = angular.module('bitmamaCorsoAngular', ['bitmamaDataProvider']);

app.controller('mainCtrl', function ($scope, addressBook) {
  addressBook.get()
    .then(function (addressbook) {
      $scope.addressbook = addressbook;
    }, function (error) {
      $scope.error = error;
    });
});