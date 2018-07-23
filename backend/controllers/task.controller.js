const moment = require('moment');

const {integerRegex} = require('../regex');

const {
  memberAccessToTask,
  adminAccessToTask,
  completeTaskFromId,
  deleteTaskFromId,
  adminForCampaign,
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
      .then(([completed]) => {
        return res.send({completed});
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
      return deleteTaskFromId(taskId)
      .then(deleted => res.send({deleted}));
    }
  });

}

function createTask (req, res, next) {

  const {email} = req.user;
  const {campaign_id, instructions, due_date} = req.body;

  if (campaign_id === undefined) {
    const error = {status: 400, message: 'campaign_id is missing'};
    return res.status(400).send({error});
  }

  if (instructions === undefined) {
    const error = {status: 400, message: 'instructions is missing'};
    return res.status(400).send({error});
  }

  if (due_date === undefined) {
    const error = {status: 400, message: 'campaign_id is missing'};
    return res.status(400).send({error});
  }

  const validatedDate = moment(due_date);

  if (!validatedDate._isValid) {
    const error = {status: 400, message: `due_date ${due_date} must be in a valid format that moment.js can read`};
    res.status(400).send({error});
  }

  if (validatedDate.isBefore(moment())) {
    const error = {
      status: 400,
      message: `due_date ${due_date} is in the past`
    }
    return res.status(400).send({error});
  }

  if (instructions.length === 0) {
    const error = {
      status: 400,
      message: 'instructions must not be empty',
    }
    return res.status(400).send({error});
  }




  adminForCampaign(email, campaign_id)
  
  .then(({admin})=> {
    if (!admin) throw new Error('notAdmin');
    return res.send();
  })
  
  .catch(error => {
    if (error.message === 'notAdmin') {
      const error = {
        status: 401,
        message: `user ${email} must be an admin for campaign ${campaign_id} to create tasks`,
      }
      return res.status(401).send({error});
    }
    return next(error);
  });

}

module.exports = {
  completeTask,
  deleteTask,
  createTask,
};