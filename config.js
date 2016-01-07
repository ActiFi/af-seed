
var _ = require('lodash');
var path = require('path');


var environments = {
  development: {
    DATABASE_URL: 'postgres://user:password@localhost:5432/database',
    JWT_SECRET:'MEOW',
    PASSWORD_SALT:'MEOWPANTS'
  },
  testing:{
    DATABASE_URL: 'postgres://user:password@localhost:5432/database',
    JWT_SECRET:'MEOW',
    PASSWORD_SALT:'MEOWPANTS'
  },
  production:{
    // these should mimic the other env variables but are passed in via process.env
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
    site_name:'ActiFi',
    env:process.env.NODE_ENV,
    support:{
      email:'support@actifi.com'
    }
  }
};

//if(process.env.NODE_ENV == 'development')
//  console.log(config);

module.exports = config;