
var _ = require('lodash');
var routeUtil = require('routeUtil');
var bomb = require('bomb');
var validator = require('express-validation');

var dumpError = function(err) {
  console.log('ERROR:');
  console.log('====================');
  if (typeof err === 'object') {
    if (err.message)  console.log('Message: ' + err.message);
    if(err.data)      console.log('Data:', err.data);
    if(err.debug)     console.log('Debug:', err.debug);
    if (err.stack) {
      console.log('Stacktrace:');
      console.log(err.stack);
    }
  } else {
    console.log('dumpError :: err argument is not an object:', err);
  }
};


// also catch uncaught
process.on('uncaughtException', function(err){
  dumpError(err);
  process.exit();
});


// route catcher
var catcher = function(app){

  // 404
  app.use(function(req, res, next){
    res.status(404);

    // respond with json
    if (req.accepts('json')) {
      next({message:'Url does not exist.', code:404});
      return;
    }

    console.log('ERROR', 404, req.path);

    // respond with html page
    if (req.accepts('html')) {
      req.ctx = { message:'We couldn\'t find that file.', code:404 };
      routeUtil.renderView('error', req, res, 404);
      return;
    }
    // default to plain-text. send()
    res.type('txt').send('Not found');
  });


  // ENSURE ERROR
  app.use(function(err, req, res, next) {
    if (_.isError(err)) {
      next(err);
      return;
    }

    // create error from validator error...
    if (err instanceof validator.ValidationError) {
      var message = 'Validation Error';
      if(err.errors.length && err.errors[0].messages.length)
        message += ': ' + err.errors[0]['messages'][0];
      next(new bomb(message, 400, 'Bad Request', err.errors));
      return;
    }

    // handle simple objects...
    if (_.isString(err)) {
      next(new bomb(err));
      return;
    }
    if(_.isPlainObject(err)){
      next(new bomb(err.message, err.code, err.name, err.data, err.debug));
      return;
    }

    next(err);
  });



  // HANDLE RESPONSE
  app.use(function(err, req, res, next) {
    // LOG IT
    dumpError(err);
    // SEND IT
    res.send({
      status:'error',
      code:err.code || 500,
      name:err.name || 'Unknown Server Error',
      message:err.message || 'An unknown server error has occurred.',
      data: err.data || {},
      debug:_.extend({}, { url:req.path }, err.debug)
    });
  });
};


module.exports = catcher;