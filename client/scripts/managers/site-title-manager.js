// simple service to set page title
ngApp.service('siteTitleManager', function(config, APP_CONFIG, $document) {
  var pageTitle;
  return pageTitle = {
    set: function(value) {
      $document[0].title = APP_CONFIG.APP_NAME + (value ? ' - ' + value:'');
    },
    get:function(){
      return $document[0].title;
    }
  };
});
