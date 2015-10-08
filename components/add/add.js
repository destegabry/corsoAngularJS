angular.module('bitmamaCorsoAngular')
  .controller('addCtrl', function ($scope, $location, $window, addressBook) {
    
    $scope.genders = addressBook.genders();

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