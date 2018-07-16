const router = require('express').Router();

const {authenticate} = require('../../auth');
const {completeTask} = require('../../controllers/task.controller');

router.route('/:id')
  .patch(authenticate, completeTask);

module.exports = router;