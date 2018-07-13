const {db} = require('./db/db');

const getActivistFromId = id => db.one('SELECT * FROM activist WHERE id = $1', id);

const getActivistFromEmail = email =>
  db.one('SELECT * FROM activist WHERE email = $1', email);

const getCampaignsFromActivistEmail = email => db.manyOrNone(
  `SELECT campaign.name, campaign.logo, campaign.description, campaign.id, membership.membership
  FROM
      campaign
      JOIN membership ON campaign.id = membership.campaign_id
      JOIN activist ON membership.activist_id = activist.id
      WHERE activist.email = $1`, email);


module.exports = {
  getActivistFromId,
  getActivistFromEmail,
  getCampaignsFromActivistEmail,
};
