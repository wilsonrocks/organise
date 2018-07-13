process.env.NODE_ENV = 'test';

const app = require('../app');

const request = require('supertest')(app);

const {
  errorCheck,
  activistCheck,
  campaignCheck,
  credentialsCheck} = require('./checks');

const chai = require('chai');

chai.use(require('chai-datetime'));

const {expect} = chai;

const {sample} = require('lodash');

const seed = require('../db/seed');
const testData = require('../db/generate')();
const {pgp} = require('../db/db');

const TEST_USERNAME = 'tester@test.com';
const TEST_PASSWORD = 'password';
const TEST_ACTIVIST_ID = 1;

describe('API', function () {

  before(function () {
  });

  beforeEach(function () {
    return seed(testData);
  });

  after(() => pgp.end());

  describe('/api/v1/activist/:id', function () {
    describe('GET', function () {
      
      it('returns 401 if valid credentials are not present', () => credentialsCheck('GET', '/api/v1/activist'));

      it('returns 200 and required information when the email is in the database', function () {
        const activist = sample(testData.activist);
        return request
        .get(`/api/v1/activist`)
        .auth(TEST_USERNAME, TEST_PASSWORD)
        .expect(200)
        .then( ({body: {activist, campaigns}}) => {

          activistCheck(activist);

          expect(campaigns).to.be.an('array');
          const correctNumberOfCampaigns = testData.membership.filter(
            membership => membership.activist_id === TEST_ACTIVIST_ID
          ).length;
          expect(campaigns.length).to.equal(correctNumberOfCampaigns);

          if (campaigns.length > 0) campaignCheck(campaigns[0]);

        })
      });


    });
  });

  describe('/api/v1/campaign/:id', function () {

    describe('GET', function () {
      it('returns 401 if valid credentials are not present', () => credentialsCheck('GET', '/api/v1/activist'));

      it('returns a 400 if id is not an integer', function () {
        return request
        .get('/api/v1/campaign/feck')
        .auth(TEST_USERNAME, TEST_PASSWORD)
        .expect(400)
        .then(({body:{error}}) => errorCheck(error, 400));
      });
    });

  });

});

