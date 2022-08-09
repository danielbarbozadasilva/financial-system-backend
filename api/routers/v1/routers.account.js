const joi = require('joi')
const accountController = require('../../controllers/controllers.account')
const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate_dto')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify_id_exists')
const asyncMiddleware = require('../../utils/middlewares/middlewares.async')

module.exports = (router) => {
  router
    .route('/account')
    .get(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('LIST_ACCOUNT')),
      asyncMiddleware(accountController.listAllAccountController)
    )

  router.route('/account/:accountid').get(
    asyncMiddleware(authenticationMiddleware()),
    asyncMiddleware(authorizationMiddleware('LIST_ID_ACCOUNT')),
    asyncMiddleware(
      validateDTOMiddleware('params', {
        accountid: joi.number().integer().required().messages({
          'any.required': '"account id" is a required field',
          'number.empty': '"account id" can not be empty'
        })
      })
    ),

    asyncMiddleware(verifyIdDbMiddleware.verifyIdAccountDbMiddleware),
    asyncMiddleware(accountController.listByIdAccountController)
  )

  router.route('/account/client/:clientid').get(
    asyncMiddleware(authenticationMiddleware()),
    asyncMiddleware(authorizationMiddleware('LIST_CLIENT_BALANCE')),
    asyncMiddleware(
      validateDTOMiddleware('params', {
        clientid: joi.number().integer().required().messages({
          'any.required': '"client id" is a required field',
          'number.empty': '"client id" can not be empty'
        })
      })
    ),
    asyncMiddleware(verifyIdDbMiddleware.verifyIdClientDbMiddleware),
    asyncMiddleware(accountController.checkBalanceController)
  )
}
