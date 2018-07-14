const {resolve} = require('path');
const router = require('express').Router();

const activistRouter = require('./activist.route');
const campaignRouter = require('./campaign.route');

router.get('', (req, res)=>res.sendFile(resolve('public/doc.html')));

router.use('/activist', activistRouter);
router.use('/campaign', campaignRouter);

module.exports = router;