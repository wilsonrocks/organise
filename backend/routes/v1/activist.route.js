const router = require('express').Router();

const {authenticate} = require('../../app');

const {getDetails} = require('../../controllers/activist.controller');

router.route('/:id')
  .get(getDetails);

module.exports = router;