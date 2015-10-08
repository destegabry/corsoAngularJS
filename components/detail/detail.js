angular.module('bitmamaCorsoAngular')
  .controller('detailCtrl', function ($scope, $location, $routeParams, addressBook) {
    addressBook.get($routeParams.id)
      .then(function (person) {
        $scope.person = person;
      });

    $scope.delete = function () {
      addressBook.delete($scope.person.id)
        .then(function () {
          $location.url('list');
        });
    }
  });