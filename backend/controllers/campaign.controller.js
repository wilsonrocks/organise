const {integerRegex} = require('../regex');
const {authorisedToViewCampaign} = require('../models');

function getTasks (req, res, next) {

  const {id: campaignId} = req.params;

  const {email} = req.user;


  if (!integerRegex.test(campaignId)) {
    const error = {status: 400, message: `The id URL parameter ${campaignId} should be an integer`};
    return res.status(400).send({error});
  }

  return authorisedToViewCampaign(email, campaignId)
  .then(authorised => {
    if (!authorised) {
      const error = {status: 401, message: `User with email ${email} is not authorised to view this campaign.`};

      return res.status(401).send({error});
    }
    else {
      return res.send();
    }
  });

}


module.exports = {getTasks};