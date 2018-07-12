const {authenticate} = require('../../auth');
const activistRouter = require('./activist.route');

const router = require('express').Router();

router.all(/\/.+/, authenticate);
router.get('', (req, res)=>res.send('\nThere will be some API help here, in time\n'));
router.use('/activist', activistRouter);

module.exports = router;