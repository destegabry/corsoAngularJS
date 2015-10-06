angular.module('bitmamaDataProvider', [])
  .service('addressBook', function ($http, $q) {
    var _addrBook = null;
    var addressBookService = {
      get: function () {
        var deferred = $q.defer();
        if (!_addrBook && _addrBook.length === 0) {
          $http.get('/data.json')
            .then(function (response) {
              _addrBook = response.data;
              deferred.resolve(_addrBook);
            }, function (error) {
              deferred.reject(error);
            });
        } else {
          deferred.resolve(_addrBook);
        }
        return deferred.promise;
      }
    };

    return addressBookService;
  });