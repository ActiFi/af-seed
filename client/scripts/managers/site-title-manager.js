// simple service to set page title
ngApp.service('siteTitleManager', function(config, $document) {
  var pageTitle;
  return pageTitle = {
    set: function(value) {
      $document[0].title = config.label.moduleAuth + (value ? ' - ' + value:'');
    },
    get:function(){
      return $document[0].title;
    }
  };
});
