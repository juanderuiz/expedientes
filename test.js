var request = require('supertest');
var app = require('./app');

describe('Request to the root path', function(){

  it('Returns a 200 status code', function(done) {

  	request(app)
    .get('/')
    .expect(200, done);

  });

  it('Returns HTML format', function(done){

    request(app)
    .get('/')
    .expect('Content-Type', /html/, done);

  });

  it ('Returns an index file with the word Expedientes in the content', function(done){
   
    request(app)
    .get('/')
    .expect(/expedientes/i, done);

  });
  
});

describe('List all expedientes in /expedientes', function(){

  it('Returns a 200 status code', function(done) {

  	request(app)
    .get('/expedientes')
    .expect(200, done);

  });

  it('Returns JSON', function(done) {

  	request(app)
    .get('/expedientes')
    .expect('Content-Type', /json/, done);

  });

  it('Returns all expedientes', function(done) {

  	request(app)
    .get('/expedientes')
    .expect(JSON.stringify(["01001/15", "01002/15", "12003/15"]), done);

  });
  
});

