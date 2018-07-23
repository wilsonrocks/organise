const router = require('express').Router();
const {integerId} = require('../../middleware');

const {authenticate} = require('../../auth');
const {
  completeTask,
  deleteTask,
  createTask,
} = require('../../controllers/task.controller');

router.route('/:id')
  .patch(authenticate, completeTask)
  .delete(integerId, authenticate, deleteTask);
  
router.route('')
  .post(authenticate, createTask);

module.exports = router;