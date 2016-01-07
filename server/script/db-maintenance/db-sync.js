
var db = require('db');

module.exports = function(options){

  console.log('----- Syncing Database...');

  return db.sequelize.sync(options)
    .then(function(){
      console.log('----- Sync Completed');
    })
    .catch(console.error);
};