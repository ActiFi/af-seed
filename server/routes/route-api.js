var config = require('config');
var path = require('path');

var express = require('express');
var api = require('api');
var router = express.Router();

// load all routes in api dir
var routeDir = path.resolve(config.dirs.api);
router = api.loadRouteDir(routeDir, router);

module.exports = router;