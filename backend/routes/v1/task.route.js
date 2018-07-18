const router = require('express').Router();
const {integerId} = require('../../middleware');

const {authenticate} = require('../../auth');
const {
  completeTask,
  deleteTask,
} = require('../../controllers/task.controller');

router.route('/:id')
  .patch(authenticate, completeTask)
  .delete(integerId, authenticate, deleteTask);

module.exports = router;