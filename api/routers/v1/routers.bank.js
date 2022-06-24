const bankController = require('../../controllers/controllers.bank')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')

module.exports = (router) => {
  router
    .route('/bank')
    .get(
      authorizationMiddleware('LIST_BANKS'),
      bankController.listAllBanksController
    )
}
