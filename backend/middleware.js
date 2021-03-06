const morgan = require('morgan')('dev');
const cors = require('cors');

const {integerRegex} = require('./regex');

function integerId (req, res, next) {
  const {id} = req.params;
  if (!integerRegex.test(id)) {
    const error = {
      status: 400,
      message: `The id URL parameter ${id} should be an integer`,
    };
    return res.status(400).send({error});
  }
  return next();
}

function logErrorToScreen(err, req, res, next) {
  if (process.env.NODE_ENV !== 'production') console.error(err);
  return next()
}

function jsonChecker (err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res.send({status:400, message:'Bad JSON'});
  }
  else next();
}

function errorHandler (err, req, res, next) {
  const error = {
    status: 500,
    message: `Something went wrong!`
  };
  return res.status(500).send({error});
}

const bodyParser = require('body-parser').json();

function middleware (app) {
  app.use(cors());
  app.use(bodyParser);
  app.use(jsonChecker);
  if (process.env.NODE_ENV === 'dev') {
    app.use(morgan);
  }
}

function errorHandling (app) {
  app.use(logErrorToScreen);
  // app.use(errorHandler);
}

module.exports = {middleware, errorHandling, integerId};
