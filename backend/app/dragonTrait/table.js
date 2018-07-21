const pool = require('../../databasePool');
const TraitTable = require('../trait/table');

class DragonTraitTable {
  // Side effect and not return value, so no promise necessary.
  // But the promise keeps things consistent with the other table functions.
  static storeDragonTrait({ dragonId, traitType, traitValue }) {
    return new Promise((resolve, reject) => {
      TraitTable.getTraitId({ traitType, traitValue })
        .then(({ traitId }) => {
          pool.query(
            // note that if you're specifying column names, order doesn't matter
            'INSERT INTO dragonTrait("traitId", "dragonId") VALUES($1, $2)',
            [traitId, dragonId],
            (error, response) => {
              if (error) return reject(error);

              resolve();
            }
          );
        })
        .catch(error => reject(error));
    });
  }
}

module.exports = DragonTraitTable;
