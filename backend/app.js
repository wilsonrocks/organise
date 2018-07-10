const app = require('express')();

app.use('/api/v1', require('./routes/v1/api.route'));



module.exports = app;
