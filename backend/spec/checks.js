const expect = require('chai').expect;

function errorCheck ({body:{error}}, code) {
  expect(error).to.be.an('object');
  expect(error).to.have.keys('status', 'message');
  expect(error.status).to.be.a('number');
  expect(error.status).to.eql(code);
  expect(error.message).to.be.a('string')
}

module.exports = {
  errorCheck
};