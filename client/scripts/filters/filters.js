ngApp.filter('default', function() {
  return function(value, defaultValue) {
    return value || defaultValue;
  };
});