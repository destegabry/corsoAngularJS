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
    var _addrBook = undefined;
    var _loadAddressBook = function (id) {
      var deferred = $q.defer();
      if (angular.isUndefined(_addrBook)) {
        $http.get('/data.json?v=2')
          .then(function (response) {
            _addrBook = response.data;
            deferred.resolve(_getUserOrAddrBook(id));
          }, function (error) {
            deferred.reject(error.data);
          });
      } else {
        deferred.resolve(_getUserOrAddrBook(id));
      }
      return deferred.promise;
    };
    var _getUserIndex = function (id) {
      for (var i = 0; i < _addrBook.length; i++) {
        if (_addrBook[i].id == id) {
          return i;
        }
      }
      return -1;
    }
    var _getUserOrAddrBook = function (id) {
      if (angular.isDefined(id)) {
        return _addrBook[_getUserIndex(id)];
      } else {
        return _addrBook;
      }
    }

    var addressBookService = {
      genders: function () {
        return ADDR_BOOK_GENDERS;
      },
      add: function (person) {
        return _loadAddressBook()
          .then(function (addrBook) {
            if (angular.isUndefined(person.id)) {
              person.id = $window.Math.round($window.Math.random() * 1000);
              addrBook.push(person);
            } else {
              addrBook[_getUserIndex(person.id)] = person;
            }
          });
      },
      get: function (id) {
        return _loadAddressBook(id);
      },
      delete: function (id) {
        var promise = _loadAddressBook();
        promise.then(function (addrBook) {
          addrBook.splice(_getUserIndex(id), 1);
        });
        return promise;

      }
    };

    return addressBookService;
  });