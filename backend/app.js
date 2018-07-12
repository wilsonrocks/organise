require('./env.js'); // sets NODE_ENV correctly

const app = require('express')();
const middleware = require('./middleware');

middleware(app);

app.use('/api/v1', require('./routes/v1/api.route'));

const {authenticate} = require('./auth');

app.post('/', authenticate, (req, res) => res.send(`HELLO ${req.user.name}`));






module.exports = app;
