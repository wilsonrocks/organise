const {getActivistFromEmail} = require('./models');

const {pgp} = require('./db/db');
const {QueryResultError} = pgp.errors;

const LocalStrategy = require('passport-local');


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

passport.use(new LocalStrategy (verify));

function checkCredentialFormat (req, res, next) {
  const {username, password} = req.body;
  
  if (username && password) return next()
  else return res
  .status(400)
  .send({
    error: {
      status: 400,
      message: 'you need to specify a username and password in the body of the request'
    }
  });
}

const authenticate = passport.authenticate('local', {session: false});


module.exports = {
  checkCredentialFormat,
  authenticate,
}
