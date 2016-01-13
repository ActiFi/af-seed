var _ = require('lodash');
var api = require('api');
var config = require('config');
var jwt = require('jsonwebtoken');
//var db = require('db');

var tenantConfig = require('tenantConfig');
var bomb = require('bomb');


var middleware = {

  // handy makers for returning jsend
  addCallback:function(req, res, next){
    var callback = function(err, data){
      if(err) return next(err);
      res.json({status:'success', data:data});
    };
    // add 4 helper functions
    res.success = function(data){ callback(null, data); };
    res.error = function(err){ callback(err); };
    res.callback = callback;
    next();
  },

  // attach db to a route
  //db:function(req, res, next){
  //  req.db = db;
  //  next();
  //},

  // attach tenantConfig to req
  tenantConfig:function(req, res, next){
    req.tenantConfig = {};

    var headers = req.headers;

    var hostname = null;
    if(_.has(headers, 'x-forwarded-host')) hostname = headers['x-forwarded-host'];

    if(!hostname)
      return next(new Error('no x-forwarded-host found. Cannot attach tenantConfig'));

    tenantConfig.get(hostname)
      .then(function(tenantConfig){
        req.tenantConfig = tenantConfig;
        next();
      })
      .catch(next);
  }

  //// if a token was passed in header, etc...
  //// decode it and attach to req as user
  //jwt:function(req, res, next){
  //  if(!req.token) {
  //    req.user = null;
  //    next();
  //  } else {
  //    jwt.verify(req.token, config.server.JWT_SECRET, function(err, decoded) {
  //      if(err){
  //        next(err)
  //      } else {
  //        req.user = decoded;
  //        next();
  //      }
  //    })
  //  }
  //}

};

module.exports = middleware;