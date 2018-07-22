process.env.NODE_ENV = 'test';

const app = require('../app');

const request = require('supertest')(app);

const {
  errorCheck,
  activistCheck,
  campaignCheck,
  taskCheck,
  credentialsCheck,
  deletedTaskCheck,
} = require('./checks');

const chai = require('chai');

chai.use(require('chai-datetime'));

const {expect} = chai;

const {sample} = require('lodash');

const seed = require('../db/seed');
const testData = require('../db/testData');
const {pgp} = require('../db/db');



const {activist:[{email:testUsername}]}= testData;
const testPassword = 'password;'
const credentials = [testUsername, testPassword];

const TEST_ACTIVIST_ID = 1;
const TEST_CAMPAIGN_ID = 1;

describe('API', function () {

  before(function () {
  });

  beforeEach(function () {
    return seed(testData);
  });

  after(() => pgp.end());

  describe('non existent routes', function () {
    it('gives a 404', function () {
      return request
      .get('/api/v1/blah')
      .expect(404);
    });
  });

  describe('/api/v1/activist/:id', function () {
    describe('GET', function () {

      it('returns 401 if valid credentials are not present', () => credentialsCheck('GET', '/api/v1/activist'));

      it('returns 200 and required information when the email is in the database', function () {
        const activist = sample(testData.activist);
        return request
        .get(`/api/v1/activist`)
        .auth(...credentials)
        .expect(200)
        .then( ({body: {activist, campaigns}}) => {

          activistCheck(activist);

          expect(campaigns).to.be.an('array');
          expect(campaigns.length).to.equal(2);

          campaignCheck(campaigns[0]);


        })
      });
    });
  });

  describe('/api/v1/campaign/:id', function () {

    describe('GET', function () {

      it('returns a 400 if id is not an integer', function () {
        return request
        .get('/api/v1/campaign/feck')
        .auth(testUsername, testPassword)
        .expect(400)
        .then(({body:{error}}) => errorCheck(error, 400));
      });

      it('returns 401 if valid credentials are not present', () => credentialsCheck('GET', '/api/v1/activist'));

      it('returns 401 if credentials are valid, but the user is not authorised to view the campaign', function () {

        const usersCampaignIds = testData.membership.filter(
          membership => membership.activist_id === TEST_ACTIVIST_ID)
        .map(membership => membership.campaign_id);

        const unauthorisedCampaignId = testData.campaign.filter(
          campaign => !usersCampaignIds.includes(campaign.id)
        )[0].id;

        return request
        .get(`/api/v1/campaign/${unauthorisedCampaignId}`)
        .auth(testUsername, testPassword)
        .expect(401)
        .then(({body:{error}}) => errorCheck(error, 401));
      });

      it('returns 200 and the correct data if the request is okay', function () {
        return request
        .get(`/api/v1/campaign/${TEST_CAMPAIGN_ID}`)
        .auth(testUsername, testPassword)
        .expect(200)
        .then(({body: {campaign, tasks}}) => {
          campaignCheck(campaign);
          expect(tasks).to.be.an('array');
          if (tasks.length > 0) taskCheck(tasks[0]);
        });
      });
    });
  });

  describe('/api/v1/task/:id', function () {
    describe('PATCH', function () {

      it('returns a 400 if id is not an integer', function () {
        return request
        .patch('/api/v1/task/fatherted')
        .auth(...credentials)
        .expect(400)
        .then(({body:{error}}) => errorCheck(error, 400));
      });

      it('returns 401 if valid credentials are not present', () => credentialsCheck('PATCH', '/api/v1/task/1'));

      it('returns 401 if credentials are valid but not authorised to change this task', function () {
        return request
        .patch('/api/v1/task/5')
        .auth(...credentials)
        .expect(401)
        .then(({body:{error}}) => errorCheck(error, 401));
      });

      it('returns 400 if the request is valid but the task is already completed', function () {
        return request
        .patch('/api/v1/task/1')
        .auth(...credentials)
        .expect(400)
        .then(({body:{error}}) => errorCheck(error, 400));
      });

      it('returns 200 and the completed task if all is okay', function () {
        return request
        .patch('/api/v1/task/3')
        .auth(...credentials)
        .expect(200)
        .then(({body:{completed:{task_id, activist_id}}}) => {
          expect(task_id).to.be.a('number');
          expect(activist_id).to.be.a('number');
        })
      });
    });

    describe('DELETE', function () {
      it('returns a 400 if id is not an integer', function () {
        return request
        .delete('/api/v1/task/fatherted')
        .auth(...credentials)
        .expect(400)
        .then(({body:{error}}) => errorCheck(error, 400));
      });

      it('returns 401 if valid credentials are not present', () => credentialsCheck('DELETE', '/api/v1/task/1'));

      it('returns 401 if credentials are valid but user doesn\'t have admin persmissions for this task', function () {
        return request
        .delete('/api/v1/task/1')
        .auth(...credentials)
        .expect(401)
        .then(({body:{error}}) => errorCheck(error, 401));
      });

      it('returns 200 and the deleted task if all is okay', function () {
        return request
        .delete('/api/v1/task/4')
        .auth(...credentials)
        .expect(200)
        .then(({body:{deleted}}) => {
          deletedTaskCheck(deleted);
        });
      });
    });
  })

});

