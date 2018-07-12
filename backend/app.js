require('./env.js'); // sets NODE_ENV correctly

const app = require('express')();
const middleware = require('./middleware');

middleware(app);

app.use('/api/v1', require('./routes/v1/api.route'));







module.exports = app;
