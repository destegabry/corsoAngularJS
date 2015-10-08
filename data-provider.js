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
    var _loadAddressBook = function (id) {
      var deferred = $q.defer();
        if (!_addrBook) {
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
    var _getUserOrAddrBook = function (id) {
      if (id) {
        for (var i = 0; i < _addrBook.length; i++) {
          if(_addrBook[i].id == id){
            return _addrBook[i];
          }
        }
        return null;
      } else {
        return _addrBook;
      }
    }
    
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
          }, function () { 
            console.log('errore!'); 
          });
        return promise;
      },
      get: function (id) {
        return _loadAddressBook(id);
      },
      delete: function (id){
        var promise = _loadAddressBook();
        promise.then(function(addrBook){
          for (var i =0; i < addrBook.length; i++){
            if(addrBook[i].id == id){
              addrBook.splice(i, 1);
              break;
            }
          }
        });
        return promise; 

      }
    };

    return addressBookService;
  });