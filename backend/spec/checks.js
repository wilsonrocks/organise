const expect = require('chai').expect;
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

function campaignCheck ({id, name, description, logo}) {
  expect(id).to.match(integerRegex);
  expect(name).to.be.a('string');
  expect(description).to.be.a('string');
  expect(logo).to.be.a('string');
}



module.exports = {
  errorCheck,
  activistCheck,
  campaignCheck,
};