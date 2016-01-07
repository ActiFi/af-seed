var _ = require('lodash');
var api = require('api');
var config = require('config');
var jwt = require('jsonwebtoken');

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

  // attach tenantConfig to req
  tenantConfig:function(req, res, next){
    req.tenantConfig = {};

    var headers = req.headers;
    var subDomain = null;
    if(_.has(headers, 'x-forwarded-host')) subDomain = headers['x-forwarded-host'];
    if(!subDomain){
      console.log('no x-forwarded-host found. Cannout attach tenantConfig');
      next();
    }

    tenantConfig.get(subDomain)
      .then(function(tenantConfig){
        req.tenantConfig = tenantConfig;
        next();
      })
      .catch(function(error){
        next(bomb.boom(error))
      });
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