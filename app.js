var app = angular.module('bitmamaCorsoAngular', ['bitmamaDataProvider', 'ui.bootstrap']);

app.controller('mainCtrl', function ($scope, addressBook) {

  $scope.genders = [{
    value: 'f',
    label: 'Femmina'
  }, {
    value: 'm',
    label: 'Maschio'
  }, {
    value: 't',
    label: 'Tuscolano'
  }];

  $scope.orderBy = function (predicate) {
    $scope.reverse = $scope.orderPredicate !== predicate ? false : !$scope.reverse;
    $scope.orderPredicate = predicate;
  }

  addressBook.get()
    .then(function (addrBook) {
      $scope.addrBook = addrBook;
      $scope.newPerson = {
        gender: $scope.addrBook[0].gender
      };
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
  $scope.deletePerson = function (person) {
    for (var i = 0; i < $scope.addrBook.length; i++) {
      if (angular.equals(person, $scope.addrBook[i])) {
        $scope.addrBook.splice(i,1);
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