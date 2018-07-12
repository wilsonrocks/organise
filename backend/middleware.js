const morgan = require('morgan')('dev');


function logErrorToScreen(err, req, res, next) {
  if (process.env.NODE_ENV === 'dev') console.error(err);
  return next()
}

function jsonChecker (err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res.send({status:400, message:'Bad JSON'});
  }
  else next();
}

const bodyParser = require('body-parser').json();

function middleware (app) {
  app.use(bodyParser);
  // app.use(jsonChecker);
  if (process.env.NODE_ENV === 'dev') {
    app.use(morgan);
  }
}

function errorHandling (app) {
  app.use(logErrorToScreen);
}

module.exports = {middleware, errorHandling};
