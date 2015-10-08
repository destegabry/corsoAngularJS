var app = angular.module('bitmamaCorsoAngular', ['bitmamaDataProvider', 'ui.bootstrap', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/list', {
      templateUrl: 'components/list/list.html',
      controller: 'listCtrl'
    })
    .when('/add', {
      templateUrl: 'components/add/add.html',
      controller: 'addCtrl'
    })
    .otherwise('/list');
});