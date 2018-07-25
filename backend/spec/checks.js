const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest')(app);

const {integerRegex} = require('../regex');

const {activist:[{email:testEmail}]}= require('../db/testData');
const testPassword = 'password';

const inPast = dateString => expect(new Date(dateString)).to.beforeTime(new Date());
const inFuture = dateString => expect(new Date(dateString)).to.afterTime(new Date());

function requestFromString (method) {
  if (method === 'GET') return request.get;
  if (method === 'PUT') return request.put;
  if (method === 'PATCH') return request.patch;
  if (method === 'POST') return request.post;
  if (method === 'DELETE') return request.delete;
}

function credentialsCheck (method, url) {
  const requestMethod = requestFromString(method);
  return Promise.all([

  requestMethod(url)
  .expect(401),

  requestMethod(url)
  .auth(testEmail)
  .expect(401),

  requestMethod(url)
  .auth(null, testPassword)
  .expect(401)
  ]);
}

function errorCheck (error, code) {
  expect(error).to.be.an('object');
  expect(error).to.have.keys('status', 'message');
  expect(error.status).to.be.a('number');
  expect(error.status).to.eql(code);
  expect(error.message).to.be.a('string')
}

function activistCheck ({id, email, name, joined}) {
  expect(id).to.match(integerRegex);
  expect(email).to.be.a('string');
  expect(name).to.be.a('string');
  inPast(joined);
}

function campaignCheck ({id, name, description, logo, membership}) {
  expect(id).to.match(integerRegex);
  expect(name).to.be.a('string');
  expect(description).to.be.a('string');
  expect(logo).to.be.a('string');
  expect(membership).to.be.a('string');
}

function taskCheckAdmin
  ({id, campaign_id, instructions, due_date, number_completed, number_assigned, done}) {
  expect(id).to.match(integerRegex);
  expect(campaign_id).to.match(integerRegex);
  expect(instructions).to.be.a('string');
  inFuture(due_date);
  expect(number_completed).to.be.a('number');
  expect(number_assigned).to.be.a('number');
  expect(number_assigned).to.be.at.least(number_completed);
  expect(done).to.be.a('boolean');
}

function taskCheck
  ({id, campaign_id, instructions, due_date}) {
  expect(id).to.match(integerRegex);
  expect(campaign_id).to.match(integerRegex);
  expect(instructions).to.be.a('string');
  inFuture(due_date);
}

module.exports = {
  errorCheck,
  activistCheck,
  campaignCheck,
  credentialsCheck,
  taskCheck,
  taskCheckAdmin,
};