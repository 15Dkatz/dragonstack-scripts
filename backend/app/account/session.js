const uuid = require('uuid/v4');
const { hash } = require('./helper');
const SEPARATOR = '|';

class Session {
  constructor({ username }) {
    this.username = username;
    this.id = uuid();

    // TODO: backfill changes and scripts to turn this.id to this.sessionId.
    // will make things far simpler...
  }

  toString() {
    const { username, id } = this;

    return Session.sessionString({ username, id });
  }

  static accountData({ username, id }) {
    return `${username}${SEPARATOR}${id}`;
  }

  static sessionString({ username, id }) {
    const accountData = Session.accountData({ username, id });

    console.log('')

    return `${accountData}${SEPARATOR}${hash(accountData)}`;
  }

  static parse(sessionString) {
    const sessionData = sessionString.split(SEPARATOR);

    return {
      username: sessionData[0],
      id: sessionData[1],
      sessionHash: sessionData[2]
    };
  }

  static verify(sessionString) {
    const { username, id, sessionHash } = Session.parse(sessionString);

    const accountData = Session.accountData({ username, id });

    return hash(accountData) === sessionHash;
  }
}

module.exports = Session;
