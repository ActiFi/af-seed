var should = require('should');
var request = require('supertest');


var testServer = require('startTestServer');

describe('app', function () {

  // start/refresh server before each test....
  var app;
  beforeEach(function (done) { app = testServer.start(done); });
  afterEach(function (done) {  testServer.stop(app, done); });

  it('should exist', function (done) {
    should.exist(app);
    done();
  });

  it('should respond to /', function testHome(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('expects 404', function test400(done) {
    request(app)
      .get('/foo/bar/baz/cow/moo/pants')
      .expect(404, done);
  });

});