process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const {ORGANISE_DB_USER, ORGANISE_DB_PW} = process.env;

const connection = {
  host: 'localhost',
  port: 5432,
  database: `organise_${process.env.NODE_ENV}`,
  user: ORGANISE_DB_USER,
  password: ORGANISE_DB_PW
};


const pgp = require('pg-promise')();
const db = pgp(connection);

module.exports = {db, pgp};
