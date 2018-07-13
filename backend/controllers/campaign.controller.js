const {integerRegex} = require('../regex');

function getTasks (req, res, next) {
  const {id} = req.params;
  if (!integerRegex.test(id)) {
    const error = {status: 400, message: `The id URL parameter ${id} should be an integer`};
    return res.status(400).send({error});
  } 
}


module.exports = {getTasks};