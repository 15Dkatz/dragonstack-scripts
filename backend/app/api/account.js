const { Router } = require('express');
const { hash } = require('../account/helper');
const Session = require('../account/session');
const { setSession } = require('./helper');
const AccountTable = require('../account/table');

const router = new Router();

router.post('/new', (req, res, next) => {
  const { username, password } = req.body;

  const usernameHash = hash(username);
  const passwordHash = hash(password);

  AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
      if (!account) {
        return AccountTable.storeAccount({ usernameHash, passwordHash })
      } else {
        const error = new Error('This username has been taken');

        error.statusCode = 409;

        throw error;
      }
    })
    .then(() => {
      return setSession({ username, res });
    })
    .then(({ message }) => res.json({ message }))
    .catch(error => next(error));
});

module.exports = router;
