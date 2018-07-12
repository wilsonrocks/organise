process.env.NODE_ENV = 'test';

const app = require('../app');
const request = require('supertest')(app);
const {
  errorCheck,
  activistCheck,
  campaignCheck} = require('./checks');

const chai = require('chai');

chai.use(require('chai-datetime'));

const {expect} = chai;

const {sample} = require('lodash');

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

    it('returns 200 and required information when the ID is valid', function () {
      const activist = sample(testData.activist);
      const {id} = activist;
      return request
      .get(`/api/v1/activist/${id}`)
      .expect(200)
      .then( ({body: {activist, campaigns}}) => {

        activistCheck(activist);

        expect(campaigns).to.be.an('array');
        const correctNumberOfCampaigns = testData.membership.filter(
          membership => membership.activist_id === id
        ).length;
        expect(campaigns.length).to.equal(correctNumberOfCampaigns);

        if (campaigns.length > 0) campaignCheck(campaigns[0]);

      })
    });

    it('returns a 400 when id is not an integer', function () {
      return request
      .get('/api/v1/activist/blah')
      .expect(400)
      .then(({body: {error}}) => errorCheck(error, 400));
    });

    it('returns a 404 when id is valid but not found', function () {

      const numberOfActivists = testData.activist.length;

      return request
      .get(`/api/v1/activist/${numberOfActivists + 1}`)
      .expect(404)
      .then(({body: {error}}) => {
        errorCheck(error, 404)
      });
    });

  });

});

