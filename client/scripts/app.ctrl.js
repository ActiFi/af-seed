ngApp.controller('AppCtrl', function($scope, siteTitleManager, APP_CONFIG, $log) {

  console.log(APP_CONFIG);

  siteTitleManager.set();

  // controller:
  var ctrl = this;


  $scope.$on('$stateChangeSuccess', function(event, toState){
    //console.log('$stateChangeSuccess', toState)
  });

  $scope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
    //$log.error('$stateChangeError', error)
  });

});