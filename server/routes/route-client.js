var _ = require('lodash');
var config = require('config');
var path = require('path');


var routeUtil = require('routeUtil');
var express = require('express');


var router = express.Router();


//
// STATIC FILES
//
router.use(express.static(config.dirs.static));


//
// BASIC ROUTES
//
router.get('/', routeUtil.defaultRenderer('index'));
router.get('/index.html', routeUtil.redirectTo('/'));
router.get('/error-invalid-browser.html', routeUtil.defaultRenderer('error-invalid-browser'));
router.get('/error.html', function(req, res, next){
  req.ctx = routeUtil.getParams(req);
  routeUtil.renderView('error', req, res);
});

//
// VIEWS
//
router.get('/views/*', function(req, res){
  var view = (''+req.url);
  view = view.slice(-1) == '/' ? view + 'index.html':view;                // convert any / to /index.html
  view = view.substr(7, view.length);                                     // strip /views/ from start of path
  view = view.substr(-5) == '.html' ? view.substr(0, view.length-5):view; // strip .html
  routeUtil.renderView(view, req, res);
});


//
// CONFIG
//
router.get('/js/config.js', function(req, res){
  res.send('window.config = ' + JSON.stringify(config.public) + ';');
});


//
// LIBS
//
router.get('/js/libs.js', function(req, res){
  console.log('FILEPATH', filePath);

  var filePath = config.dirs.static + '/js/libs.min.js';
  // send non-minified version if development
  if(process.env.NODE_ENV === 'development')
    filePath = config.dirs.static + '/js/libs.js';
  routeUtil.sendFile(filePath, req, res);
});


module.exports  = router;