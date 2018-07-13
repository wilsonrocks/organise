const router = require('express').Router();

const {getTasks} = require('../../controllers/campaign.controller');

router.route('/:id')
  .get(getTasks);

module.exports = router;