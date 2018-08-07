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
  const { dragonId, nickname, isPublic, saleValue } = req.body;

  DragonTable.updateDragon({ dragonId, nickname, isPublic, saleValue })
    .then(() => res.json({ message: 'successfully updated dragon' }))
    .catch(error => next(error));
});

router.get('/public-dragons', (req, res, next) => {
  DragonTable.getPublicDragons()
    .then(({ dragons }) => res.json({ dragons }))
    .catch(error => next(error));
});

router.post('/buy', (req, res, next) => {
  const { dragonId, saleValue } = req.body;
  let buyerId;

  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account, authenticated }) => {
      // needed because the authenticatedAccount helper rejects invalid session strings
      // but a valid session string may be still be unauthenticated
      // and authenticatedAccount will return authenticated: false in that case
      if (!authenticated) throw new Error('Unauthenticated');

      if (saleValue > account.balance) {
        throw new Error('Sale value exceeds balance');
      };

      buyerId = account.id;

      // get the sellerId based off the existing dragonId/accountDragon association
      return AccountDragonTable.getDragonAccount({ dragonId })
    })
    .then(({ accountId }) => {
      if (accountId === buyerId) {
        throw new Error('Cannot buy your own dragon!');
      };

      const sellerId = accountId;

      // the only trouble with this is that if an updateAccount/updateDragon fails, then the updateBalance may not occur
      // but that is a lower-level error of a Promise all implementation not working, as long as the implementation is correct
      return Promise.all([
        AccountTable.updateBalance({
          accountId: buyerId, value: -saleValue
        }),
        AccountTable.updateBalance({
          accountId: sellerId, value: saleValue
        }),
        AccountDragonTable.updateDragonAccount({
          dragonId, accountId: buyerId
        }),
        DragonTable.updateDragon({
          dragonId, isPublic: false
        })
      ])
    })
    .then(() => res.json({ message: 'success!' }))
    .catch(error => next(error));
});

module.exports = router;