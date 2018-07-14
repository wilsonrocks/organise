const router = require('express').Router();

const {authenticate} = require('../../auth');
const {getTasks} = require('../../controllers/campaign.controller');

router.route('/:id')
  .get(authenticate, getTasks);

module.exports = router;