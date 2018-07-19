const pool = require('../databasePool');
const traits = require('../data/traits');

Object.keys(traits).forEach(traitType => {
  const traitValues = traits[traitType];

  traitValues.forEach(traitValue => {
    pool.query(
      `INSERT INTO trait ("traitType", "traitValue") VALUES ($1, $2) RETURNING id`,
      [traitType, traitValue],
      (error, response) => {
        if (error) console.error(error);

        const traitId = response.rows[0].id;

        console.log(`Inserted trait - id: ${traitId}`);
      }
    )
  });
});