
ngApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/login");

  $stateProvider

    .state('login', {
      url:'/login',
      controller:  'LoginCtrl',
      templateUrl: "views/login/login-view.html"
    })

});
