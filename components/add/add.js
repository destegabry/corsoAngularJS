angular.module('bitmamaCorsoAngular')
  .controller('addCtrl', function ($scope, addressBook) {
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