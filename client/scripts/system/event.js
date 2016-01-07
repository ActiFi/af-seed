ngApp.service('$event', function($rootScope, $log) {
  var logEvent, service;

  logEvent = function(type, eventName, data) {
    var suppress = [service.EVENT_loaderStart, service.EVENT_loaderStop, service.EVENT_msgClear];
    if (!_.contains(suppress, eventName))
      $log.debug('$event.' + type + ': ' + eventName, data);
  };

  return service = {

    EVENT_loaderStart: 'Loader.start',
    EVENT_loaderStop: 'Loader.stop',
    EVENT_msgClear: 'Msg.clear',
    EVENT_msgShow: 'Msg.show',

    shout: function(eventName, data) {
      logEvent('shout', eventName, data);
      return $rootScope.$broadcast(eventName, data);
    },
    broadcast: function($scope, eventName, data) {
      logEvent('broadcast', eventName, data);
      return $scope.$broadcast(eventName, data);
    },
    emit: function($scope, eventName, data) {
      logEvent('emit', eventName, data);
      return $scope.$emit(eventName, data);
    }
  };
});
