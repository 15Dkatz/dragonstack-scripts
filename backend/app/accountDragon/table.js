const pool = require('../../databasePool');

class AccountDragonTable {
  static storeAccountDragon({ accountId, dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO accountDragon("accountId", "dragonId") VALUES($1, $2)',
        [accountId, dragonId],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  static getAccountDragons({ accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT "dragonId" FROM accountDragon WHERE "accountId" = $1',
        [accountId],
        (error, response) => {
          if (error) return reject(error);

          resolve({ accountDragons: response.rows });
        }
      )
    });
  }
}

AccountDragonTable.getAccountDragons({ accountId: 1 })
  .then(({ accountDragons }) => console.log('accountDragons', accountDragons))
  .catch(error => console.log('error', error));

module.exports = AccountDragonTable;