angular.module('bitmamaDataProvider', [])
  .service('addressBook', function ($http, $q) {
    var _addrBook = null;
    var addressBookService = {
      get: function () {
        var deferred = $q.defer();
        if (!_addrBook) {
          $http.get('/data.json')
            .then(function (response) {
              _addrBook = response.data;
              deferred.resolve(_addrBook);
            }, function () {

            });
        } else {

        }
        return deferred.promise;
      }
    };

    return addressBookService;
  });