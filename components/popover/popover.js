angular.module('bitmamaCorsoAngular')
  .directive('popover', function () {
    return {
      restrict: 'A',
      templateUrl: 'components/popover/popover-tpl.html',
      transclude: true,
      scope: {
        popover: '='
      },
      link: function (scope, elem) {
        var tooltip;
        var text;
        var children = elem.children();
        for (var i = 0; i < children.length || !text || !tooltip; i++) {
          var child = angular.element(children[i]);
          if (child.hasClass('popover-text')) {
            text = child;
          } else if (child.hasClass('popover-tooltip')) {
            tooltip = child;
          }
        };

        text.bind('mouseenter mouseleave', function () {
          tooltip.toggleClass('hidden');
        });
      }
    };
  });