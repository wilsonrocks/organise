const {integerRegex} = require('../regex');

const {
  memberAccessToTask,
  adminAccessToTask,
  completeTaskFromId,
} = require('../models');

function completeTask (req, res, next) {

  const {id: taskId} = req.params;
  const {email} = req.user;

  if (!integerRegex.test(taskId)) {
    const error = {
      status: 400,
      message: `The id URL parameter ${taskId} should be an integer`};
    return res.status(400).send({error});
  }

  return memberAccessToTask(email, taskId)
  .then(authorised => {

    if (!authorised) {
      const error = {
        status: 401,
        message: `User with email ${email} is not authorised to mark this task as complete`
      };
      return res.status(401).send({error});
    }

    else {
      return completeTaskFromId(email, taskId)
      .then(completed => {
        return res.send({completed})
      });
    }

  })
  .catch(error => {
    if (error.code === '23505') {
      const error = {
        status: 400,
        message: `User with email ${email} has already completed this task.`
      };
      return res.status(400).send({error});
    }
    next(error);
  });
}

function deleteTask (req, res, next) {
  const {email} = req.user;
  const {id: taskId} = req.params;

  return adminAccessToTask(email, taskId)
  .then(authorised => {

    if (!authorised) {
      const error = {
        status: 401,
        message: `User with email ${email} is not authorised to mark this task as complete`
      };
      return res.status(401).send({error});
    }

    else {
      return res.send();
    }
  });

}

module.exports = {
  completeTask,
  deleteTask,
};