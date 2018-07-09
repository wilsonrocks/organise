const {campaigns, activists} = require('./generate')();

const {db, pgp} = require('./db');

const {ColumnSet, insert} = pgp.helpers;

const deleteAll = () => db.none(`
  DELETE FROM campaign;
  DELETE FROM activist;
`);


const seedActivists = () => {
  const activistColumns = new ColumnSet(
    ['id', 'email', 'name', 'last_login', 'joined'],
    {table: 'activist'}
  );
  const seedActivists = insert(activists, activistColumns);
  return db.none(seedActivists);
}

const seedCampaigns = () => {
  const campaignColumns = new ColumnSet(['id', 'name', 'description', 'logo'], {table: 'campaign'});
  const seedCampaigns = insert(campaigns, campaignColumns);
  return db.none(seedCampaigns);
}


async function seed () {
  await deleteAll();
  await seedCampaigns();
  await seedActivists();
  pgp.end();
}






seed();