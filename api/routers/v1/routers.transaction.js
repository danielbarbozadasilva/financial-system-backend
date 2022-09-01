const joi = require('joi')
const transactionController = require('../../controllers/controllers.transaction')
const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')

module.exports = (router) => {
  router.route('/transaction/client/:clientid/asset/:financialid').post(
    authenticationMiddleware(),
    authorizationMiddleware('CREATE_TRANSACTION'),
    validateDTOMiddleware('params', {
      clientid: joi.number().integer().required().messages({
        'any.required': '"client id" is a required field',
        'number.empty': '"client id" can not be empty'
      }),
      financialid: joi.number().integer().required().messages({
        'any.required': '"asset id" is a required field',
        'number.empty': '"asset id" can not be empty'
      })
    }),
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
    }),
    verifyIdDbMiddleware.verifyIdClientDbMiddleware,
    verifyIdDbMiddleware.verifyIdFinancialDbMiddleware,
    transactionController.createTransactionController
  )

  router.route('/transaction/deposit/client/:clientid').post(
    authenticationMiddleware(),
    authorizationMiddleware('CREATE_DEPOSIT'),
    validateDTOMiddleware('params', {
      clientid: joi.number().integer().required().messages({
        'any.required': '"client id" is a required field',
        'number.empty': '"client id" can not be empty'
      })
    }),
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
    }),
    verifyIdDbMiddleware.verifyIdClientDbMiddleware,
    transactionController.createDepositController
  )

  router
    .route('/transaction/client')
    .get(
      authenticationMiddleware(),
      authorizationMiddleware('LIST_CLIENT_TRANSACTION'),
      transactionController.listAllUserTransactionController
    )

  router.route('/transaction/client/:clientid').get(
    authenticationMiddleware(),
    authorizationMiddleware('LIST_CLIENT_ID_TRANSACTION'),
    validateDTOMiddleware('params', {
      clientid: joi.number().integer().required().messages({
        'any.required': '"client id" is a required field',
        'number.empty': '"client id" can not be empty'
      })
    }),
    verifyIdDbMiddleware.verifyIdClientDbMiddleware,
    transactionController.listByIdUserTransactionController
  )

  router.route('/transaction/deposit/client/:clientid').get(
    authenticationMiddleware(),
    authorizationMiddleware('LIST_CLIENT_ID_DEPOSIT'),
    validateDTOMiddleware('params', {
      clientid: joi.number().integer().required().messages({
        'any.required': '"client id" is a required field',
        'number.empty': '"client id" can not be empty'
      })
    }),
    verifyIdDbMiddleware.verifyIdClientDbMiddleware,
    transactionController.listByIdUserDepositController
  )
}
