ngApp.controller('AppCtrl', function($scope, siteTitleManager, $log) {

  siteTitleManager.set();

  // controller:
  var ctrl = this;


  $scope.$on('$stateChangeSuccess', function(event, toState){
    $log.info('$stateChangeSuccess', toState)
  });

  $scope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
    $log.info('$stateChangeSuccess', error)
  });

});