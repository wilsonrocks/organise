const {integerRegex} = require('../regex');

const {
  authorisedToCompleteTask,
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
  
  return authorisedToCompleteTask(email, taskId)
  .then(authorised => {

    if (!authorised) {
      const error = {
        status: 401,
        message: `User with email ${email} is not authorised to modify this task`
      };
      return res.status(401).send({error});
    }

    else {
      return completeTaskFromId(email, taskId)
      .then(completed => {
        return res.send({completed})
      })
      .catch(error => {
        console.error(error);
        return res.status(500).send();
      });
    }

  });
}

module.exports = {completeTask};