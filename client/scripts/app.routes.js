
ngApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");

  $stateProvider

    .state('home', {
      url:'/home',
      controller:  'HomeCtrl',
      templateUrl: "views/home/home-view.html"
    })

    // STORY
    .state('story', {
      abstract:true,
      url:'/story/{storyId:int}',
      controller:'StoryCtrl as StoryCtrl',
      templateUrl: 'views/story/story-view.html',
      resolve:{
        Story:function(storyService, $stateParams) {
          return storyService.getStory($stateParams.storyId);
        }
      }
    })

    .state('story.sketches', {
      url: "/sketches",
      controller: 'SketchesCtrl as SketchesCtrl',
      templateUrl: "views/story/sketches/sketches-view.html",
      resolve:{
        StoryDetails:function(storyService, $stateParams) {
          return storyService.getStoryDetails($stateParams.storyId);
        }
      }
    })

    .state('story.sketches.sketch', {
      url: "/{sketchId:int}",
      controller: 'SketchCtrl as SketchCtrl',
      templateUrl: "views/story/sketches/sketch-view.html",
      resolve:{
        Sketch:function(storyService, $stateParams) {
          return storyService.getSketch($stateParams.storyId, $stateParams.sketchId);
        }
      }
    })





    .state('story.notes', {
      url: "/notes"
    })

    //.state('story.sketch', {
    //  url: "/{sketch:int}",
    //  controller: 'SketchCtrl as SketchCtrl',
    //  templateUrl: "views/story/sketch-view.html"
    //});


    //.state('story.latest', {
    //  url: "/:story/latest",
    //  controller: 'SketchCtrl',
    //  templateUrl: "views/sketch-view.php"
    //})
});
