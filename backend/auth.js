const {getActivistFromEmail} = require('./models');

const {pgp} = require('./db/db');
const {QueryResultError} = pgp.errors;

const {BasicStrategy} = require('passport-http');

const passport = require('passport');

passport.initialize();

function verify (username, password, done) {
  getActivistFromEmail(username)
    .then(user => done(null, user))
    .catch(error => {
      if (error instanceof QueryResultError) {
        return done(false);
      }
    });
}

passport.use(new BasicStrategy (verify));

function checkCredentialFormat (req, res, next) {
  const {bodyUsername, bodyPassword} = req.body;
  const bodyCredentials = (bodyUsername && bodyPassword);
  const {queryUsername, queryPassword} = req.query;
  const queryCredentials = (queryUsername && queryPassword);

  if (bodyCredentials || queryCredentials) return next()
  else return res
  .status(400)
  .send({
    error: {
      status: 400,
      message: 'you need to specify a username and password in the body or querystring of the request'
    }
  });
}

const authenticate = passport.authenticate('basic', {session: false});


module.exports = {
  checkCredentialFormat,
  authenticate,
}
