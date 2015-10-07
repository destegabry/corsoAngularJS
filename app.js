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

  $scope.editPerson = function (person) {
    $scope.newPerson = angular.copy(person);
    for (var i = 0; i < $scope.addrBook.length; i++) {
      if (angular.equals(person, $scope.addrBook[i])) {
        $scope.selectedPerson = i;
        break;
      }
    };
  };

  $scope.savePerson = function (person) {
    if (!angular.isUndefined($scope.selectedPerson)) {
      $scope.addrBook[$scope.selectedPerson] = person;
      delete $scope.selectedPerson;
    } else {
      $scope.addrBook.push(person);
    }
    $scope.newPerson = {};
  }
});