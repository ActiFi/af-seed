ngApp.service('api', function($http, $log) {

  var api = null;
  return api = {

    baseUrl:'/api',

    call: function(url, params, options) {
      options = options || {};
      var request = {
        method:options.method || 'post',
        url: api.baseUrl + url,
        data: params
      };
      return $http(request)
        .then(function(response){
          return response.data;
        })
        ['catch'](function(response){
          $log.error(response);
          alert(response);
          // TODO: handle error
        });

    },

    get:function(url, params, options) {
      return api.call(url, params, _.extend({}, {method:'get'}, options))
    },
    post:function(url, params, options) {
      return api.call(url, params, _.extend({}, {method:'post'}, options))
    }

  };
});