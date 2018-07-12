process.env.NODE_ENV = 'dev';
const {pgp} = require('./db');

const [ACTIVISTS, CAMPAIGNS] = [10000, 2000]

console.log(`Making a seed database for dev mode with ${ACTIVISTS} activists and ${CAMPAIGNS} campaigns.`);
console.log('This might take a while if there\'s a lot of data!')

const generate = require('./generate');
const seed = require('./seed');

console.log('Generating Data...');
const data = generate(ACTIVISTS, CAMPAIGNS);
console.log('Adding data to the database');
seed(data).then(() =>
{
  console.log('Done!');
  pgp.end();
});
