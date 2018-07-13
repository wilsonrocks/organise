const {resolve} = require('path');
const router = require('express').Router();

const {authenticate} = require('../../auth');
const activistRouter = require('./activist.route');
const campaignRouter = require('./campaign.route');


router.all(/\/.+/, authenticate);

router.get('', (req, res)=>res.sendFile(resolve('public/doc.html')));

router.use('/activist', activistRouter);
router.use('/campaign', campaignRouter);

module.exports = router;