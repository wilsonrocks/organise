const router = require('express').Router();
const activistRouter = require('./activist.route');

router.use('/activist', activistRouter);

module.exports = router;