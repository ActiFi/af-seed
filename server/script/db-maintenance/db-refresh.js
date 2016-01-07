
var db = require('db');

module.exports = function(options){
  if(!options || !options.enabled) return;

  var sync = require('./db-sync.js')({force:options.force})
      .then(function(){
        if(options.populate)
          return require('./db-populate.js')();
      });
};