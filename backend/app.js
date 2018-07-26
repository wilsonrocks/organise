require('dotenv').config();
require('./env.js'); // sets NODE_ENV correctly

const app = require('express')();
const {middleware, errorHandling} = require('./middleware');

middleware(app);

app.use('/api/v1', require('./routes/v1/api.route'));

errorHandling(app);


module.exports = app;
