appTenant.init(window.config);


//
// INIT
//
var dependencies = [
  'ngSanitize', 'ngAnimate', 'ngMessages', 'ui.router',
  'af.event', 'af.loader', 'af.modal', 'af.msg', 'af.storage', // af-angular-lib system
  'af.util',  'af.filters', 'af.bsIcons'                       // af-angular-lib misc
];
if(window.ie9) dependencies.push('ng.shims.placeholder');

var ngApp = angular.module('myApp', dependencies);

//
// CONSTANTS
//
ngApp.constant('$STORAGE_CONFIG', {  persistent_prefix:'myApp'  } );
ngApp.constant('$MODAL_CONFIG', {    genericModalPath:'views/partials/templates/generic-modal-view.html' });
ngApp.constant('APP_CONFIG',  {
  APP_NAME:window.config.label.moduleAuth
});


//
// CONFIG
//
ngApp.config(function($locationProvider, $httpProvider, $logProvider) {
  $httpProvider.interceptors.push('httpInterceptor');
  //$logProvider.debugEnabled(config.isDev);
});