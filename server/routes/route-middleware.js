var _ = require('lodash');
var config = require('config');
var api = require('api');
var jwt = require('jsonwebtoken');
var db = require('db');


var middleware = {

  // handy makers for returning jsend
  addCallback:function(req, res, next){
    var callback = function(err, data){
      if(err) return next(err);
      res.json({status:'success', data:data});
    };
    res.success = function(data){ callback(null, data); };
    res.error = function(err){ callback(err); };
    res.callback = callback;
    next();
  },

  // attach db to a route
  db:function(req, res, next){
    req.db = db;
    next();
  },

  // if a token was passed in header, etc...
  // decode it and attach to req as user
  jwt:function(req, res, next){
    if(!req.token) {
      req.user = null;
      next();
    } else {
      jwt.verify(req.token, config.server.JWT_SECRET, function(err, decoded) {
        if(err){
          next(err)
        } else {
          req.user = decoded;
          next();
        }
      })
    }
  }

};

module.exports = middleware;