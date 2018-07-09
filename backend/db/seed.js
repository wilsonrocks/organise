const {db, pgp} = require('./db');

const {ColumnSet, insert} = pgp.helpers;

const generated = require('./generate')();

const {
  campaign,
  activist,
  membership,
  task,
  task_status} = generated;

const deleteAll = () => db.none(`
  DELETE FROM campaign;
  DELETE FROM activist;
  DELETE FROM membership;
  DELETE FROM task;
  DELETE FROM task_status;
  DELETE FROM vote;
  DELETE FROM vote_choice;
`);

const seedActivists = () => {
  const activistColumns = new ColumnSet(
    ['id', 'email', 'name', 'last_login', 'joined'],
    {table: 'activist'}
  );
  const seedActivists = insert(activist, activistColumns);
  return db.none(seedActivists);
}

const seedCampaigns = () => {
  const campaignColumns = new ColumnSet(['id', 'name', 'description', 'logo'], {table: 'campaign'});
  const seedCampaigns = insert(campaign, campaignColumns);
  return db.none(seedCampaigns);
}

const seedMemberships = () => {
  const membershipColumns = new ColumnSet(
    ['id', 'activist_id', 'campaign_id', 'membership'],
    {table: 'membership'}
  );
  return db.none(insert(membership, membershipColumns));
}

const seedTasks = () => {
  const taskColumns = new ColumnSet(
    ['id', 'campaign_id', 'instructions', 'due_date'],
    {table: 'task'}
  );
  return db.none(insert(task, taskColumns));
}

const seedTaskStatuses = () => {
  const taskStatusColumns = new ColumnSet (
    ['id', 'task_id', 'activist_id', 'completed'],
    {table: 'task_status'}
  );
  return db.none(insert(task_status, taskStatusColumns))
}

async function seed () {
  try {
    await deleteAll();
    await seedCampaigns();
    await seedActivists();
    await seedMemberships();
    await seedTasks();
    await seedTaskStatuses();
    return generated;
  }

  catch(error) {
    throw error;
  }

  finally {
    pgp.end();
  }
}

module.exports = seed;