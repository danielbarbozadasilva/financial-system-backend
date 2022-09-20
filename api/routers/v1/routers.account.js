const joi = require('joi')
const accountController = require('../../controllers/controllers.account')
const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')

module.exports = (router) => {
  router
    .route('/account')
    .get(
      authenticationMiddleware(),
      authorizationMiddleware('LIST_ACCOUNT'),
      accountController.listAllAccountController
    )

  router.route('/account/:accountid').get(
    authenticationMiddleware(),
    validateDTOMiddleware('params', {
      accountid: joi.number().integer().required().messages({
        'any.required': '"account id" is a required field',
        'number.empty': '"account id" can not be empty'
      })
    }),
    authorizationMiddleware('LIST_ID_ACCOUNT'),
    verifyIdDbMiddleware.verifyIdAccountDbMiddleware,
    accountController.listByIdAccountController
  )

  router.route('/account/client/:clientid').get(
    authenticationMiddleware(),
    validateDTOMiddleware('params', {
      clientid: joi.number().integer().required().messages({
        'any.required': '"client id" is a required field',
        'number.empty': '"client id" can not be empty'
      })
    }),
    authorizationMiddleware('LIST_CLIENT_BALANCE'),
    verifyIdDbMiddleware.verifyIdClientDbMiddleware,
    accountController.checkBalanceController
  )
}
