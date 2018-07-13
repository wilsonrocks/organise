const router = require('express').Router();

const {getDetails} = require('../../controllers/activist.controller');

router.route('')
  .get(getDetails);

module.exports = router;