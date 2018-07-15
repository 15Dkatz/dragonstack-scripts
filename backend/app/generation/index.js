const Dragon = require('../dragon');
const { REFRESH_RATE, SECONDS } = require('../config');

const refreshRate = REFRESH_RATE * SECONDS;

class Generation {
  constructor() {
    this.expiration = this.calculateExpiration();
  }

  calculateExpiration() {
    const expirationPeriod = Math.floor(Math.random() * (refreshRate/2));

    // later on, this could take in more factors such as
    // the number of dragons in the last generation
    // for shorter/longer delays
    const msUntilExpiration = Math.random() < 0.5 ?
      refreshRate - expirationPeriod :
      refreshRate + expirationPeriod;

    return new Date(Date.now() + msUntilExpiration);
  }

  newDragon() {
    if (Date.now() > this.expiration) {
     }

    return new Dragon();
  }
}

module.exports = Generation;