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

const authorisedToViewCampaign = (email, campaignId) => db.one(
  `
  SELECT COUNT(membership.campaign_id) = 1 AS authorised
  FROM membership JOIN activist ON activist.id = membership.activist_id
  WHERE activist.email = $1 and campaign_id = $2;
  `, [email, campaignId])
.then(({authorised}) => authorised);

module.exports = {
  getActivistFromId,
  getActivistFromEmail,
  getCampaignsFromActivistEmail,
  authorisedToViewCampaign,
};
