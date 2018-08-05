const { Router } = require('express');
const DragonTable = require('../dragon/table');
const AccountDragonTable = require('../accountDragon/table');
const { authenticatedAccount } = require('./helper');

const router = new Router();

router.get('/new', (req, res, next) => {
  let accountId, dragon, dragonId;

  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      accountId = account.id;

      dragon = req.app.locals.engine.generation.newDragon();
      // dragon = req.app.locals.engine.generation.newDragon({
      //   uniqueId: accountId
      // });

      return DragonTable.storeDragon(dragon)
    })
    .then(({ dragonId }) => {
      dragon.dragonId = dragonId;

      return AccountDragonTable.storeAccountDragon({ accountId, dragonId });
    })
    .then(() => {
      res.json({ dragon });
    })
    .catch(error => next(error));
});

router.post('/update', (req, res, next) => {
  const { dragonId, nickname } = req.body;

  DragonTable.updateDragon({ dragonId, nickname })
    .then(() => res.json({ message: 'successfully updated dragon' }))
    .catch(error => next(error));
});

module.exports = router;