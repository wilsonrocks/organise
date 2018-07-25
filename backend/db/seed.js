/*
Exports a single function, seed, which takes data in the form produced by generate
from generate.js, and adds it to the database exported by db.js, and then returns
a promise which resolves to it.
*/

const {db, pgp} = require('./db');

const {ColumnSet, insert} = pgp.helpers;

const deleteAll = () => db.none(`
  DELETE FROM campaign;
  DELETE FROM activist;
  DELETE FROM membership;
  DELETE FROM task;
  DELETE FROM task_completion;
  DELETE FROM vote;
  DELETE FROM vote_choice;
`);

const seedActivists = (activist) => {
  const activistColumns = new ColumnSet(
    ['id', 'email', 'name', 'joined'],
    {table: 'activist'}
  );
  const seedActivists = insert(activist, activistColumns);
  return db.none(seedActivists);
}

const seedCampaigns = (campaign) => {
  const campaignColumns = new ColumnSet(['id', 'name', 'description', 'logo'], {table: 'campaign'});
  const seedCampaigns = insert(campaign, campaignColumns);
  return db.none(seedCampaigns);
}

const seedMemberships = (membership) => {
  const membershipColumns = new ColumnSet(
    ['id', 'activist_id', 'campaign_id', 'membership'],
    {table: 'membership'}
  );
  return db.none(insert(membership, membershipColumns));
}

const seedTasks = (task) => {
  const taskColumns = new ColumnSet(
    ['id', 'campaign_id', 'instructions', 'due_date'],
    {table: 'task'}
  );
  return db.none(insert(task, taskColumns));
}

const seedTaskCompletions = (task_completion) => {
  const taskCompletionColumns = new ColumnSet (
    ['id', 'task_id', 'activist_id'],
    {table: 'task_completion'}
  );
  return db.none(insert(task_completion, taskCompletionColumns))
}

async function resetAllSequences () {
  /*
  This is necessary because the generate function specifically generates id fields
  for the data. This doesn't automatically update the id sequence in postgres.
  */
  const tables = ['campaign', 'activist', 'membership', 'task', 'task_completion'];
  const resetPromises = tables.map(table => {
    const query = `SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table})+1);`;
    return db.one(query);
  });
  return Promise.all(resetPromises);
}

async function seed ({
    campaign,
    activist,
    membership,
    task,
    task_completion
  }) {
  
    try {
    await deleteAll();

    const output =  {
      campaign: await seedCampaigns(campaign),
      activist: await seedActivists(activist),
      membership: await seedMemberships(membership),
      task: await seedTasks(task),
      task_completion: await seedTaskCompletions(task_completion),
    }

    await resetAllSequences();

    return output;
  }

  catch(error) {
    throw error;
  }
}

module.exports = seed;