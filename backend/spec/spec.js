const request = require('supertest');
const expect = require('chai').expect;

const seed = require('../db/seed');
const testData = require('../db/generate')();
const {pgp} = require('../db/db');

describe('tests', function () {

  before(function () {
  });

  beforeEach(function () {
    return seed(testData);
  });

  after(() => pgp.end());

  it('is a fake test', function () {
  });

  it('is also fake test', function () {
  });

});

