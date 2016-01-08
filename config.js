var _ = require('lodash');
var path = require('path');


var environments = {
  development: {
    // whatever config
  },
  testing:{
    // whatever config
  },
  production:{
    // whatever config
  }
};


// store some paths in our config based on app root.
var dirs = {};
dirs.root = path.resolve(__dirname);
dirs.client = 'client';
dirs.server = 'server';
dirs.views =  path.resolve(dirs.client, 'views');
dirs.static = path.resolve(dirs.client, 'static');
dirs.models = path.resolve(dirs.server, 'models');
dirs.routes = path.resolve(dirs.server, 'routes');
dirs.api =    path.resolve(dirs.server, 'api');

//
// THE EXPORT
//
var config = {
  dirs:dirs,
  server: _.extend({}, environments[process.env.NODE_ENV], process.env),
  // exposed to public
  public:{
    env:process.env.NODE_ENV
  }
};

//if(process.env.NODE_ENV == 'development')
//  console.log(config);

module.exports = config;