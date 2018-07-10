const app = require('../app');
const request = require('supertest')(app);
const expect = require('chai').expect;

const seed = require('../db/seed');
const testData = require('../db/generate')();
const {pgp} = require('../db/db');

describe('API', function () {

  before(function () {
  });

  beforeEach(function () {
    return seed(testData);
  });

  after(() => pgp.end());

  describe('/api/v1/activist/:id', function (){

    it.skip('returns 200 and required information when the ID is valid', function () {
      // request
      // .get('/activist')
    });

    it('returns a 400 when id is not an integer', function () {
      return request
      .get('/api/v1/activist/blah')
      .expect(400);
    });

  });

});

