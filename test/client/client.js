var should = require('should');
var superTest = require('supertest');


var testServer = require('startTestServer');

describe('client routes', function () {

  // start/refresh server before each test....
  var app;
  var request;
  beforeEach(function (done) {
    app = testServer.start(done);
    request = superTest(app)
  });
  afterEach(function (done) {  testServer.stop(app, done); });

  it('should serve static files', function (done) {
    request
        .get('/img/favicon.ico')
        .expect(200, done);
  });

  it('should serve /', function (done) {
    request
        .get('/')
        .expect(200, done);
  });

  it('should re-direct /index.html', function (done) {
    request
      .get('/index.html')
      .expect(302, done);
  });

  it('should serve /error-invalid-browser.html', function (done) {
    request
      .get('/error-invalid-browser.html')
      .expect(200, done);
  });

  it('should serve /views/*', function (done) {
    request
      .get('/views/index.html')
      .expect(200, done);
  });

  it('should serve url error to /error.html?message=facedesk&code=999', function (done) {
    request
      .get('/error.html?message=facedesk&code=999')
      .expect(200)
      .end(function(err, res){
        should.not.exist(err);
        res.text.should.be.html;
        res.text.should.containEql('facedesk');
        res.text.should.containEql('999');
        done();
      });
  });

  it('should serve posted error to /error.html', function (done) {
    request
      .get('/error.html')
      .send({message: 'facedesk', code: 999})
      .expect(200)
      .end(function(err, res){
        should.not.exist(err);
        res.text.should.be.html;
        res.text.should.containEql('facedesk');
        res.text.should.containEql('999');
        done();
      });
  });

  it('should serve /js files', function (done) {
    request
        .get('/js/app.js')
        .expect(200, done)
  });

  it('should serve js/config.js', function (done) {
    request
      .get('/js/config.js')
      .expect(200, done)
  });

  it('should serve js/libs.js', function (done) {
    request
      .get('/js/libs.js')
      .expect(200, done)
  });

});