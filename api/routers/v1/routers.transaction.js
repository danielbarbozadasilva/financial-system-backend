const joi = require('joi')
const transactionController = require('../../controllers/controllers.transaction')
const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate_dto')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify_exists')
const asyncMiddleware = require('../../utils/middlewares/middlewares.async')

module.exports = (router) => {
  router.route('/transaction/client/:clientid/asset/:financialid').post(
    asyncMiddleware(authenticationMiddleware()),
    asyncMiddleware(authorizationMiddleware('CREATE_TRANSACTION')),
    asyncMiddleware(
      validateDTOMiddleware('params', {
        clientid: joi.number().integer().required().messages({
          'any.required': '"client id" is a required field',
          'number.empty': '"client id" can not be empty'
        }),
        financialid: joi.number().integer().required().messages({
          'any.required': '"asset id" is a required field',
          'number.empty': '"asset id" can not be empty'
        })
      })
    ),
    asyncMiddleware(
      validateDTOMiddleware('body', {
        current_price: joi.number().required().messages({
          'any.required': `"current_price" is a required field`,
          'number.empty': `"current_price" can not be empty`
        }),
        subtotal_price: joi.number().required().messages({
          'any.required': `"subtotal_price" is a required field`,
          'number.empty': `"subtotal_price" can not be empty`
        }),
        total_price: joi.number().required().messages({
          'any.required': `"total_price" is a required field`,
          'number.empty': `"total_price" can not be empty`
        }),
        quantity: joi.number().integer().required().messages({
          'any.required': `"quantity" is a required field`,
          'number.empty': `"quantity" can not be empty`
        })
      })
    ),
    asyncMiddleware(verifyIdDbMiddleware.verifyIdClientDbMiddleware),
    asyncMiddleware(verifyIdDbMiddleware.verifyIdFinancialDbMiddleware),
    asyncMiddleware(transactionController.createTransactionController)
  )

  router.route('/transaction/deposit/client/:clientid').post(
    asyncMiddleware(authenticationMiddleware()),
    asyncMiddleware(authorizationMiddleware('CREATE_DEPOSIT')),
    asyncMiddleware(
      validateDTOMiddleware('params', {
        clientid: joi.number().integer().required().messages({
          'any.required': '"client id" is a required field',
          'number.empty': '"client id" can not be empty'
        })
      })
    ),
    asyncMiddleware(
      validateDTOMiddleware('body', {
        bank_id: joi.number().integer().required().messages({
          'any.required': `"bank id" is a required field`,
          'number.empty': `"bank id" can not be empty`
        }),
        origin_cpf: joi.string().required().messages({
          'any.required': `"origin_cpf" is a required field`,
          'string.empty': `"origin_cpf" can not be empty`
        }),
        total: joi.number().required().messages({
          'any.required': `"total" is a required field`,
          'number.empty': `"total" can not be empty`
        })
      })
    ),
    asyncMiddleware(verifyIdDbMiddleware.verifyIdClientDbMiddleware),
    asyncMiddleware(transactionController.createDepositController)
  )

  router
    .route('/transaction/client')
    .get(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('LIST_CLIENT_TRANSACTION')),
      asyncMiddleware(transactionController.listAllUserTransactionController)
    )

  router.route('/transaction/client/:clientid').get(
    asyncMiddleware(authenticationMiddleware()),
    asyncMiddleware(authorizationMiddleware('LIST_CLIENT_ID_TRANSACTION')),
    asyncMiddleware(
      validateDTOMiddleware('params', {
        clientid: joi.number().integer().required().messages({
          'any.required': '"client id" is a required field',
          'number.empty': '"client id" can not be empty'
        })
      })
    ),
    asyncMiddleware(verifyIdDbMiddleware.verifyIdClientDbMiddleware),
    asyncMiddleware(transactionController.listByIdUserTransactionController)
  )

  router.route('/transaction/deposit/client/:clientid').get(
    asyncMiddleware(authenticationMiddleware()),
    asyncMiddleware(authorizationMiddleware('LIST_CLIENT_ID_DEPOSIT')),
    asyncMiddleware(
      validateDTOMiddleware('params', {
        clientid: joi.number().integer().required().messages({
          'any.required': '"client id" is a required field',
          'number.empty': '"client id" can not be empty'
        })
      })
    ),
    asyncMiddleware(verifyIdDbMiddleware.verifyIdClientDbMiddleware),
    asyncMiddleware(transactionController.listByIdUserDepositController)
  )
}
