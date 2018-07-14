const router = require('express').Router();

const {authenticate} = require('../../auth');

const {getDetails} = require('../../controllers/activist.controller');

router.route('')
  .get(authenticate, getDetails);

module.exports = router;