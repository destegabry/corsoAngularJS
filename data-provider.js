angular.module('bitmamaDataProvider', [])
  .constant('ADDR_BOOK_GENDERS', [{
      value: 'f',
      label: 'Femmina'
    }, {
      value: 'm',
      label: 'Maschio'
    }, {
      value: 'o',
      label: 'Other'
    }])
  .service('addressBook', function ($http, $q, $timeout, $window, ADDR_BOOK_GENDERS) {
    var _addrBook = null;
    var _loadAddressBook = function () {
      var deferred = $q.defer();
        if (!_addrBook || _addrBook.length === 0) {
          $http.get('/datajson?v=2')
            .then(function (response) {
              _addrBook = response.data;
              deferred.resolve(_addrBook);
            }, function (error) {
              deferred.reject(error.data);
            });
        } else {
          deferred.resolve(_addrBook);
        }
        return deferred.promise;
    };
    
    var addressBookService = {
      genders: function () {
        return ADDR_BOOK_GENDERS;
      },
      add: function (person) {
        var promise = _loadAddressBook();
        promise.then(function (addrBook) {
            if (!person.id) {
              person.id = $window.Math.round($window.Math.random() * 1000);
            }
            addrBook.push(person);
          }, function () { console.log('errore!'); });
        return promise;
      },
      get: function () {
        return _loadAddressBook();
      }
    };

    return addressBookService;
  });