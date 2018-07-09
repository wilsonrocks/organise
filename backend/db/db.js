process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const {user, password} = require('./secrets');

const connection = {
  host: 'localhost',
  port: 5432,
  database: `organise_${process.env.NODE_ENV}`,
  user,
  password
};

const pgp = require('pg-promise')();
const db = pgp(connection);

module.exports = {db, pgp};
