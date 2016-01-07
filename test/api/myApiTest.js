var should = require('should');
var request = require('supertest');
var testServer = require('startTestServer');

describe('app', function () {

  // start/refresh server before each test....
  var app;
  beforeEach(function (done) { app = testServer.start(done); });
  afterEach(function (done) {  testServer.stop(app, done); });


  it('should query data', function testHome(done) {
    request(app)
      .get('/api/something...')
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        res.body.should.have.property('data');
        res.body.data.should.be.an.Array;
        done();
      });
  });

});