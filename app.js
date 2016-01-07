if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
if (!process.env.PORT) process.env.PORT = 3003;

// note:
// we put core pieces of our server code in a node_modules folder inside our server dir.
// this allows us to very easily require our common server parts simply by using: require('something');

// start app
var app = require('./server/node_modules/app');

// db connection
var db = require('./server/node_modules/db');

// load routes
require('./server/routes')(app);


// only start server if not a test env
if (!module.parent) {
  var server = app.listen(process.env.PORT, function () {
    console.info("Server Started: Port:" + server.address().port, 'ENV:' + app.settings.env);
    // wipe / re-populate server (nice for db development)
    require('./server/script/db-maintenance/db-refresh.js')({enabled:false, force:false, populate:false})
  });
}

// export app for testing environments
module.exports = app;
