angular.module('bitmamaCorsoAngular')
  .directive('popover', function () {
    return {
      restrict: 'A',
      templateUrl: 'popover-tpl.html',
      scope: {
        text: '@',
        tooltip: '=popover'
      }
    };
  });