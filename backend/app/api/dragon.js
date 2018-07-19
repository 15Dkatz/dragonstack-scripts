const { Router } = require('express');
const DragonTable = require('../dragon/table');

const router = new Router();

router.get('/new', (req, res, next) => {
// res.json({ dragon: req.app.locals.engine.generation.newDragon() });
  const dragon = req.app.locals.engine.generation.newDragon();

  DragonTable.storeDragon(dragon)
    .then(({dragonId}) => {
      console.log('dragonId', dragonId);

      res.json({ dragon });
    })
    .catch(error => next(error));
});

module.exports = router;