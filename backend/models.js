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
      WHERE activist.email = $1;`, email);

const getCampaignDetailsFromId = (email, campaignId) => db.one(
  `SELECT
    campaign.name,
    campaign.logo,
    campaign.description,
    campaign.id,
    membership.membership
  FROM
    campaign
    JOIN membership ON campaign.id = membership.campaign_id
    JOIN activist ON membership.activist_id = activist.id
  WHERE campaign.id = $2 AND activist.email = $1;
  `, [email, campaignId]);

const authorisedToViewCampaign = (email, campaignId) => db.one(
  `
  SELECT COUNT(membership.campaign_id) = 1 AS authorised
  FROM membership JOIN activist ON activist.id = membership.activist_id
  WHERE activist.email = $1 and campaign_id = $2;
  `, [email, campaignId])
.then(({authorised}) => authorised);

const memberAccessToTask = (email, taskId) => db.one(
  `SELECT $2 IN (
    SELECT id FROM task WHERE campaign_id IN (
      SELECT campaign_id FROM membership
      JOIN activist
      ON activist.id = membership.activist_id
      WHERE activist.email = $1
    )
  ) as authorised;
  `, [email, taskId])
  .then(({authorised}) => authorised);

const adminAccessToTask = (email, taskId) => db.one(
  `SELECT $2 IN (
      SELECT task.id FROM membership
      JOIN activist
      ON activist.id = membership.activist_id
      JOIN task
      ON task.campaign_id = membership.campaign_id
      WHERE
        activist.email = $1
        AND membership.membership = 'admin'
  ) as authorised;
  `, [email, taskId])
  .then(({authorised})=>authorised);

const getMemberViewOfTasks = (email, campaignId) => db.any(
  `
  with

  total as (
    select task.id, count(membership.id) as assigned
    from task join membership on task.campaign_id = membership.campaign_id
    group by task.id
  ),

  completed as (
    select task.id, count(task_completion.id) as completed
    from task join task_completion on task.id = task_completion.task_id
    group by task.id
  ),

  marked_done as (
    select
      task.id,
      EXISTS(SELECT * from task_completion join activist ON activist.id = task_completion.activist_id
    where
      activist.email=$1
      AND task_completion.task_id = task.id
    ) as done
  from task)

  select task.id, task.campaign_id, task.instructions, task.due_date,
    total.assigned as number_assigned,
    COALESCE(completed.completed, 0) as number_completed,
    marked_done.done as done

  from task
  join total on task.id = total.id
  left join completed on completed.id = task.id
  join marked_done on task.id = marked_done.id
  where task.campaign_id = $2;
  `, [email, campaignId]);

const completeTaskFromId = (email, taskId) => db.any(
  `INSERT INTO task_completion (task_id, activist_id) VALUES (
    $2,
    (SELECT id FROM activist WHERE email = $1)
  )
  RETURNING *;
  `, [email, taskId]);

const deleteTaskFromId = (taskId) => db.one(
  'DELETE FROM task WHERE id = $1 RETURNING *;', taskId);

const getMembersOfCampaign = (campaignId) => db.many(
  `
  select activist.id, email, name, joined, last_login, membership
  from activist join membership on activist.id = membership.activist_id
  where membership.campaign_id = $1;`, campaignId);

module.exports = {
  getActivistFromId,
  getActivistFromEmail,
  getCampaignsFromActivistEmail,
  authorisedToViewCampaign,
  memberAccessToTask,
  adminAccessToTask,
  getMemberViewOfTasks,
  getCampaignDetailsFromId,
  completeTaskFromId,
  deleteTaskFromId,
  getMembersOfCampaign,
};
