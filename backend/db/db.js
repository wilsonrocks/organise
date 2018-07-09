const {connection} = require('./secrets');
const pgp = require('pg-promise')();
const db = pgp(connection);

module.exports = {db, pgp};
