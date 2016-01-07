
var api = require('api');
var schemas = require('./route-schemas.js');
var mw = require('./route-middleware.js');

module.exports = function(app){

  /// load security schemas into the api (public, admin, etc);
  api.schemas = schemas;

  // client-side routes (libs/views/etc)
  app.use('/',
      mw.tenantConfig,
      require('./route-client'));

  // api
  app.use('/api',
      mw.tenantConfig,
      mw.addCallback, // adds req.callback(null, data); returns jsend format
      //mw.jwt,         // adds req.user if token passed with request
      //mw.db,          // adds req.db (allows req.db.Users.findAll(...);
      require('./route-api'));

  // error catcher
  require('./route-catch')(app);
};