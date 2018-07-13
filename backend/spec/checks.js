const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest')(app);

const {integerRegex} = require('../regex');

const inPast = dateString => expect(new Date(dateString)).to.beforeTime(new Date());

function errorCheck (error, code) {
  expect(error).to.be.an('object');
  expect(error).to.have.keys('status', 'message');
  expect(error.status).to.be.a('number');
  expect(error.status).to.eql(code);
  expect(error.message).to.be.a('string')
}

function activistCheck ({id, email, name, last_login, joined}) {
  expect(id).to.match(integerRegex);
  expect(email).to.be.a('string');
  expect(name).to.be.a('string');
  inPast(last_login);
  inPast(joined);
}

function campaignCheck ({id, name, description, logo, membership}) {
  expect(id).to.match(integerRegex);
  expect(name).to.be.a('string');
  expect(description).to.be.a('string');
  expect(logo).to.be.a('string');
  expect(membership).to.be.a('string');

}

function credentialsCheck (method, url) {
  const requestMethod = requestFromString(method);
  return Promise.all([

  requestMethod(url)
  .expect(401),
  
  requestMethod(url)
  .auth('tester@test.com')
  .expect(401),

  requestMethod(url)
  .auth(null, 'fakepassword')
  .expect(401)

  
  ]);
}

function requestFromString (method) {
  if (method === 'GET') return request.get;
  if (method === 'PUT') return request.put;
  if (method === 'POST') return request.post;
  if (method === 'DELETE') return request.delete;
}

module.exports = {
  errorCheck,
  activistCheck,
  campaignCheck,
  credentialsCheck,
};