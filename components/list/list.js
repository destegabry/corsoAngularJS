angular.module('bitmamaCorsoAngular')
  .controller('listCtrl', function ($scope, $window, addressBook) {
    $scope.orderBy = function (predicate) {
      $scope.reverse = $scope.orderPredicate !== predicate ? false : !$scope.reverse;
      $scope.orderPredicate = predicate;
    }

    $scope.deletePerson = function(person){
      addressBook.delete(person.id)
      .then(function (){
        $window.alert('deleted');
      }, function (error) {
        $scope.error = {
          msg: 'Deleted error',
          raw: error
        };
      });
    };

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