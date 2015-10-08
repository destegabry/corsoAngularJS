angular.module('bitmamaCorsoAngular')
  .controller('listCtrl', function ($scope, addressBook) {
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
  });