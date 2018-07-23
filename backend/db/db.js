require('dotenv').config();
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const connection = {
  host: 'localhost',
  port: 5432,
  database: `organise_${process.env.NODE_ENV}`,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

const pgp = require('pg-promise')();
const db = pgp(connection);

module.exports = {db, pgp};
