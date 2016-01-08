ngApp.service('myService', function(config, api) {
  var storyService;
  return storyService = {

    getLatestStory:function(){
      return api.get('/stories/latest');
    }

  };
});
