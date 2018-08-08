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

  static getDragon({ dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT birthdate, nickname, "generationId", "isPublic", "saleValue"
        FROM dragon
        WHERE dragon.id = $1`,
        [dragonId],
        (error, response) => {
          if (error) return reject(error);

          if (response.rows.length === 0) return reject(new Error('no dragon'));

          resolve(response.rows[0]);
        }
      )
    });
  }

  static updateDragon({ dragonId, nickname, isPublic, saleValue }) {
    const settingsMap = { nickname, isPublic, saleValue };

    const validQueries = Object.entries(settingsMap).filter(([settingKey, settingValue]) => {
      if (settingValue !== undefined) {
        return new Promise((resolve, reject) => {
          pool.query(
            // this is ok since we trust our own settingKey values from the settingsMap
            `UPDATE dragon SET "${settingKey}" = $1 WHERE id = $2`,
            [settingValue, dragonId],
            (error, response) => {
              if (error) return reject(error);

              resolve();
            }
          );
        });
      }
    });

    return Promise.all(validQueries);
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
