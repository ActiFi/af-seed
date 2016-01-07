ngApp.directive('myDirective', function($log) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $log.info('Something Cool is about to happen');
      return '';
    }
  };
});

