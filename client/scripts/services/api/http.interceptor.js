ngApp.factory("httpInterceptor", function($q, $storage) {

  // ignore any request with a period
  var shouldIgnore = function(request){
    return request.url.substr(request.url.length - 5).indexOf('.') >= 0
  };

  var interceptor = {

    //
    // REQUEST
    //
    request: function(request) {
      if($storage.local('jwt'))
        request.headers.authorization = $storage.local('jwt');
      return request;
    },


    //
    // RESPONSE 200 SUCCESS
    //
    response: function(response) {
      // should this even run?
      if(!response.config) return response;
      var request = response.config;
      if(shouldIgnore(request)) return response;

      var isSuccess = true;
      if (response.data.status !== 'success') isSuccess = false;

      if (isSuccess) {
        response.data = response.data.data;
        return response;
      } else {
        // jsend returns status 200, but the error status is in response data:
        response.status = response.data.code;
        response.statusText = response.data.name;
        response.data = response.data.message || 'Unknown Error. Code:' + response.data.code;
        return interceptor.responseError(response);
      }
    },


    //
    // RESPONSE ERROR
    //
    responseError: function(response) {
      if(!response.config) return $q.reject(response);
      var request = response.config;
      if(shouldIgnore(request)) return $q.reject(response);

      // handle it
      //apiUtil.error.handler(response);
      return $q.reject(response);
    }
  };
  return interceptor;
});

