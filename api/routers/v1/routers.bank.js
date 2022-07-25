const bankController = require('../../controllers/controllers.bank')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const asyncMiddleware = require('../../utils/middlewares/middlewares.async')

module.exports = (router) => {
  router
    .route('/bank')
    .get(
      authorizationMiddleware('LIST_BANKS'),
      asyncMiddleware(bankController.listAllBanksController)
    )
}
