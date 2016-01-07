//
// INIT
//
var dependencies = [
  'ngSanitize', 'ngAnimate', 'ngMessages', 'ui.router'
];
if(window.ie9) dependencies.push('ng.shims.placeholder');

var ngApp = angular.module('myApp', dependencies);

//
// CONSTANTS
//
ngApp.constant('$STORAGE_CONFIG', {  persistent_prefix:'myApp'  } );
ngApp.constant('$MODAL_CONFIG', {    genericModalPath:'views/partials/templates/generic-modal-view.html' });


//
// CONFIG
//
ngApp.config(function($locationProvider, $httpProvider, $logProvider) {
  $httpProvider.interceptors.push('httpInterceptor');
  //$logProvider.debugEnabled(config.isDev);
});