const {authenticate} = require('../../auth');
const activistRouter = require('./activist.route');
const {resolve} = require('path');

const router = require('express').Router();

router.all(/\/.+/, authenticate);
router.get('', (req, res)=>res.sendFile(resolve('public/doc.html')));
router.use('/activist', activistRouter);

module.exports = router;