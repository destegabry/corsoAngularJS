angular.module('bitmamaCorsoAngular')
  .controller('addCtrl', function ($scope, $location, $window, $routeParams, addressBook) {
    $scope.genders = addressBook.genders();

    $scope.editMode = angular.isDefined($routeParams.id);

    addressBook.get($routeParams.id)
      .then(function (person) {
        $scope.newPerson = angular.copy(person);
      });

    $scope.savePerson = function (person) {
      addressBook.add(person)
        .then(function () {
          $scope.newPerson = {};
          $location.url('/list');
        }, function(error) { 
          $window.alert('Unexpected error');
        });
    }
  });