ngApp.service('storyService', function(config, api) {
  var storyService;
  return storyService = {

    getLatestStory:function(){
      return api.get('/stories/latest');
    },

    getStory:function(id){
      return api.get('/stories/'+id);
    },

    getStoryHierarchy: function(id) {
      return api.get('/stories/'+id+'/hierarchy');
    },

    getStoryDetails:function(id){
      return storyService.getStoryHierarchy(id)
        .then(function(story){
          var result = {
            story:story,
            sketches:[]
          };
          // flatten sketches into simple array
          var count = 1;
          _.each(story.Chapters, function(chapter){
            chapter.number = count++;
            _.each(chapter.Sketches, function(sketch){
              sketch.story_id = id;
              sketch.chapter_id = chapter.id;
              result.sketches.push(sketch);
            });
          });
          return result;
        })
    },

    getSketch:function(storyId, sketchId){
      return api.get('/stories/'+storyId+'/'+sketchId);
    }

  };
});
