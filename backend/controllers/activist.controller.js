const {db, pgp} = require('../db/db');
const {emailRegex} = require('../regex');

const {
  getActivistFromEmail,
  getCampaignsFromActivistEmail,
} = require('../models');

const {QueryResultError} = pgp.errors;

function getDetails (req, res, next) {

  const {email} = req.user;

  return Promise.all([
    getActivistFromEmail(email),
    getCampaignsFromActivistEmail(email)
  ])
  .then(([activist, campaigns]) => {
    return res.send({activist, campaigns})
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
}


module.exports = {
  getDetails,
}