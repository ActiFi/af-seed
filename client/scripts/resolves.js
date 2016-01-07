window.resolves = {
  myResolve: function($q, $log) {
    var defer = $q.defer();
    // do something.
    if(true)
      defer.resolve('resolved!');
    else
      defer.reject('rejected!');
    return defer.promise;
  }
};

