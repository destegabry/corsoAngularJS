angular.module('bitmamaCorsoAngular')
  .directive('popover', function () {
    return {
      restrict: 'A',
      templateUrl: 'popover-tpl.html',
      transclude: true,
      scope: {
        tooltip: '=popover'
      }
    };
  });