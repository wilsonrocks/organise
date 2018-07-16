const {resolve} = require('path');
const router = require('express').Router();

const {authenticate} = require('../../auth');

const activistRouter = require('./activist.route');
const campaignRouter = require('./campaign.route');
const taskRouter = require('./task.route');


router.get('', (req, res)=>res.sendFile(resolve('public/doc.html')));

router.get('/authenticate', authenticate, (req,res)=>res.send())

router.use('/activist', activistRouter);
router.use('/campaign', campaignRouter);
router.use('/task', taskRouter);


module.exports = router;