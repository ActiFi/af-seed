
var _ = require('lodash');
var routeUtil = require('routeUtil');
var bomb = require('bomb');
var validator = require('express-validation');

module.exports = function(app){

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

    if(_.isError(err)) {
      next(err);
      return;
    }

    var error = err;
    if(_.isString(err))
      error = bomb.boom(err, 500, 'Server Error');

    // create error from validator error...
    if (err instanceof validator.ValidationError) {
      var message = 'Validation Error';
      if(err.errors.length && err.errors[0].messages.length)
        message += ': ' + err.errors[0]['messages'][0];
      error = bomb.boom(message, 400, 'Bad Request', err.errors);
    }

    // convert object to error
    if(_.isPlainObject(err))
      error = bomb.boom(err.message, err.code, err.name, err.data, err.debug);

    // convert to an error
    if(error instanceof bomb.theBomb)
      error = error.toError();
    next(error);
  });



  // HANDLE RESPONSE
  app.use(function(err, req, res, next) {

    var code = err.code || 500;
    var message = err.message || 'Whoops! An error has occurred.';
    var name = err.name || 'Unknown Error';

    // LOG IT
    if(process.env.NODE_ENV !== 'testing') {
      console.log(err.stack);
      console.log('ERROR @ ', req.path, message, code);
    }

    res.send({
      status:'error',
      code:code,
      name:name,
      message:message,
      data: err.data,
      debug: _.extend({}, { url:req.path }, err.debug)
    });
  });
};