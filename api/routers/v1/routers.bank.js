const bankController = require('../../controllers/controllers.bank')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')

module.exports = (router) => {
  router
    .route('/bank')
    .get(
      authenticationMiddleware(),
      authorizationMiddleware('LIST_BANKS'),
      bankController.listAllBanksController
    )
}
