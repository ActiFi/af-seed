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
      if($storage.store('jwt'))
        request.headers.authorization = $storage.store('jwt');
      return request;
    },


    //
    // RESPONSE 200 SUCCESS
    //
    response: function(response) {
      if(!response.config) return response;
      var request = response.config;
      if(shouldIgnore(request)) return response;

      // JSEND
      response.data = response.data || {};

      var isSuccess = (response.data.status === 'success');
      if (isSuccess) {
        response.data = response.data.data;
        return response;
      } else {
        response.status =     response.data.code || 500;
        response.statusText = response.data.name;
        response.data =       response.data.message || 'Unknown Error. Code:' + response.data.code;
        return interceptor.responseError(response);
      }
    },


    //
    // RESPONSE ERROR
    //
    responseError: function(response) {
      return $q.reject(response);
      //if(!response.config) return $q.reject(response);
      //var request = response.config;
      //if(shouldIgnore(request)) return $q.reject(response);
      // handle it
      //apiUtil.error.handler(response);
      //return $q.reject(response);
    }
  };
  return interceptor;
});

