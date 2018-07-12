const {db, pgp} = require('../db/db');
const {integerRegex} = require('../regex');

const {
  getActivistFromId,
  getCampaignsFromActivistId
} = require('../models');

const {QueryResultError} = pgp.errors;

function getDetails (req, res, next) {

  const {id} = req.params;

  if (!id.match(integerRegex)) {
    const response = {
      error: {
        status: 400,
        message: `The requested ID ${id} should be an integer.`,
      }
    }

    return res
      .status(400)
      .send(response);
  }

  return Promise.all([
    getActivistFromId(id),
    getCampaignsFromActivistId(id)
  ])
  .then(([activist, campaigns]) => {
    return res.send({activist, campaigns})
  })
  .catch(error => {

    if(error instanceof QueryResultError) {
      const response = {
        error: {
          status: 404,
          message: `The requested id ${id} was not found.`,
        }
      };

      return res
        .status(404)
        .send(response);
    }
    return next();
  });
}


module.exports = {
  getDetails,
}