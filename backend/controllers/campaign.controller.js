const {integerRegex} = require('../regex');
const {
  authorisedToViewCampaign,
  getMemberViewOfTasks,
  getCampaignDetailsFromId,
} = require('../models');

function getTasks (req, res, next) {

  const {id: campaignId} = req.params;
  const {email} = req.user;

  if (!integerRegex.test(campaignId)) {
    const error = {
      status: 400,
      message: `The id URL parameter ${campaignId} should be an integer`};
    return res.status(400).send({error});
  }

  return authorisedToViewCampaign(email, campaignId)
  .then(authorised => {

    if (!authorised) throw new Error('unauthorised');

    return Promise.all([
      getCampaignDetailsFromId(email, campaignId),
      getMemberViewOfTasks(email, campaignId),
    ]);
    
  })
  .then(([campaign, tasks]) => {
    tasks = tasks.map(task => ({
      ...task,
      number_completed: +task.number_completed,
      number_assigned: +task.number_assigned,
    }));

    return res.send({campaign, tasks});
  })
  .catch(error => {
    if (error.message === 'unauthorised') {
      const error = {
        status: 401,
        message: `User with email ${email} is not authorised to view this campaign.`
      };
      return res.status(401).send({error});
    }
    next(error);
  });
}

module.exports = {getTasks};