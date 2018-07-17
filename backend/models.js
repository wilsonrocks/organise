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

const getCampaignDetailsFromId = id => db.one(
  `SELECT * FROM campaign WHERE id = $1`, id
);

const authorisedToViewCampaign = (email, campaignId) => db.one(
  `
  SELECT COUNT(membership.campaign_id) = 1 AS authorised
  FROM membership JOIN activist ON activist.id = membership.activist_id
  WHERE activist.email = $1 and campaign_id = $2;
  `, [email, campaignId])
.then(({authorised}) => authorised);

const authorisedToCompleteTask = (email, taskId) => db.one(
  `SELECT $2 IN (
    SELECT id FROM task WHERE campaign_id IN (
      SELECT campaign_id FROM membership
      JOIN activist
      ON activist.id = membership.activist_id
      WHERE activist.email = $1
    )
  ) as authorised;
  `, [email, taskId])
  .then(({authorised})=>authorised);

const getMemberViewOfTasks = (email, campaignId) => db.any(
  `
  SELECT * FROM task WHERE campaign_id = $2 AND id NOT IN
  (SELECT task_id FROM task_completion JOIN activist
    ON activist.id = task_completion.activist_id
    WHERE activist.email = $1);
  `, [email, campaignId]);

const completeTaskFromId = (email, taskId) => db.any(
  `INSERT INTO task_completion (task_id, activist_id) VALUES (
    $2,
    (SELECT id FROM activist WHERE email = $1)
  )
  RETURNING *;
  `, [email, taskId]);

module.exports = {
  getActivistFromId,
  getActivistFromEmail,
  getCampaignsFromActivistEmail,
  authorisedToViewCampaign,
  authorisedToCompleteTask,
  getMemberViewOfTasks,
  getCampaignDetailsFromId,
  completeTaskFromId,
};
