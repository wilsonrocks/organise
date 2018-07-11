const {db} = require('../db/db');
const {integerRegex} = require('../regex');
const {
  getActivistFromId,
  getCampaignsFromActivistId
} = require('../models');

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
  });

}


module.exports = {
  getDetails,
}