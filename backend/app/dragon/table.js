const pool = require('../../databasePool');
const DragonTraitTable = require('../dragonTrait/table');
const { getDragonWithTraits } = require('./helper');

class DragonTable {
  static storeDragon(dragon) {
    const { birthdate, nickname, generationId, isPublic, saleValue } = dragon;

    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO dragon(birthdate, nickname, "generationId", "isPublic", "saleValue")
         VALUES($1, $2, $3, $4, $5) RETURNING id`,
        [birthdate, nickname, generationId, isPublic, saleValue],
        (error, response) => {
          if (error) return reject(error);

          const dragonId = response.rows[0].id;

          Promise.all(dragon.traits.map(({ traitType, traitValue }) => {
            return DragonTraitTable.storeDragonTrait({
              dragonId, traitType, traitValue
            })
          }))
          .then(() => resolve({ dragonId }))
          .catch(error => reject(error));
        }
      )
    });
  }

  // TODO: Extend this to be literal, don't use settings?
  // Try the above, and if there's too much of the hacky logic, favor the more literal implementation
  // still group settings on the frontend. But parse the settings on the backend here
  // parse one level above, in the route, and still pass all thse values
  // const { nickname, saleValue, sireValue, isPublic } = settings.
  // so the passed object would be { dragonId, nickname, saleValue, sireValue, isPublic }
  static updateDragon({ dragonId, nickname, isPublic, saleValue }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE dragon SET nickname = $1, "isPublic" = $2, "saleValue" = $3
        WHERE id = $4`,
        [nickname, isPublic, saleValue, dragonId],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  static getPublicDragons() {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT id FROM dragon WHERE "isPublic" = TRUE',
        (error, response) => {
          if (error) return reject(error);

          const publicDragonRows = response.rows;

          publicDragonRows.map(({ id }) => getDragonWithTraits({ dragonId: id }));

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
}

module.exports = DragonTable;
