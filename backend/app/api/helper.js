const Session = require('../account/session');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');

const setSession = ({ username, res }) => {
  return new Promise((resolve, reject) => {
    const session = new Session({ username });

    const sessionString = session.toString();

    AccountTable.updateSessionId({
      sessionId: session.id,
      usernameHash: hash(username)
    })
    .then(() => {
      res.cookie('sessionString', sessionString, {
        expire: Date.now() + 36000000,
        httpOnly: true,
        // secure: true // use with https
      });

      resolve({ message: 'session created' });
    })
    .catch(error => reject(error));
  });
};

module.exports = { setSession };