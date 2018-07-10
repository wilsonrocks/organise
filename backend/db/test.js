const {db, pgp} = require('./db');


const data = require('./generate')(10000, 100);
const seed = require('./seed');
seed(data);

console.log(process.env.NODE_ENV);


db.any('SELECT * FROM task_status')
.then(console.log)
.catch(console.error)