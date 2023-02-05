const bankController = require('../../controllers/controllers.bank')
const authenticationMiddleware = require('../../middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../middlewares/middlewares.authorization')

module.exports = (router) => {
  router
    .route('/bank')
    .get(
      authenticationMiddleware(),
      authorizationMiddleware('LIST_BANKS'),
      bankController.listAllBanksController
    )
}
