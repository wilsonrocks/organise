const {db} = require('./db/db');

const getActivistFromId = id => db.one('SELECT * FROM activist WHERE id = $1', id);

const getCampaignsFromActivistId = id => db.manyOrNone(
  `SELECT campaign.name, campaign.logo, campaign.description, campaign.id
  FROM
      campaign
      JOIN membership ON campaign.id = membership.campaign_id
      WHERE membership.activist_id = $1`, id);

module.exports = {
  getActivistFromId,
  getCampaignsFromActivistId,
};
