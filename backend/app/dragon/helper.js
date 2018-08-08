const DragonTable = require('./table');
const pool = require('../../databasePool');

const getDragonWithTraits = ({ dragonId }) => {
  return Promise.all([
    DragonTable.getDragon({ dragonId }),
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT "traitType", "traitValue"
        FROM trait
        INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId"
        WHERE dragonTrait."dragonId" = $1`,
        [dragonId],
        (error, response) => {
          if (error) return reject(error);

          // TODO: experiment with resolving an object
          resolve(response.rows);
        }
      )
    })
  ])
  .then(([dragon, dragonTraits]) => {
    dragon.dragonId = dragonId;
    dragon.traits = dragonTraits;

    return dragon;
  })
  .catch(error => console.error(error));
}

const getPublicDragons = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT id FROM dragon WHERE "isPublic" = TRUE',
      (error, response) => {
        if (error) return reject(error);

        const publicDragonRows = response.rows;

        Promise.all(
          publicDragonRows.map(
            ({ id }) => getDragonWithTraits({ dragonId: id })
          )
        )
        .then(dragons => resolve({ dragons }))
        .catch(error => reject(error));
      }
    )
  });
}

module.exports = { getDragonWithTraits, getPublicDragons };

// Notes on promise order resolving!
// https://stackoverflow.com/questions/28066429/promise-all-order-of-resolved-values

// As the previous answers have already stated, Promise.all aggregates all resolved values with an array corresponding to the input order of the original Promises (see Aggregating Promises).

// However, I would like to point out, that the order is only preserved on the client side!

// To the developer it looks like the Promises were fulfilled in order but in reality, the Promises are processed at different speeds. This is important to know when you work with a remote backend because the backend might receive your Promises in a different order.