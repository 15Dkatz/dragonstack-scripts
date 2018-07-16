const pool = require('../../databasePool');

class GenerationTable {
  static storeGeneration(generation) {
    pool.query(
      'INSERT INTO generation(expiration) VALUES($1)',
      [generation.expiration],
      (error, response) => {
        if (error) console.error(error);
        // if (error) return reject(error);

        // const generationId = response.rows[0].id;

        // resolve({ generationId });
      }
    );
  }
}

module.exports = GenerationTable;
