const joi = require('joi')
const transactionController = require('../../controllers/controllers.transaction')
const validateDTOMiddleware = require('../../middlewares/middlewares.validate-dto')
const authenticationMiddleware = require('../../middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../middlewares/middlewares.authorization')
const verifyIdDbMiddleware = require('../../middlewares/middlewares.verify-exists')

module.exports = (router) => {
  router.route('/transaction/client/:clientid/asset/:financialid').post(
    authenticationMiddleware(),
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
    authorizationMiddleware('CREATE_TRANSACTION'),
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
    validateDTOMiddleware('params', {
      clientid: joi.number().integer().required().messages({
        'any.required': '"client id" is a required field',
        'number.empty': '"client id" can not be empty'
      })
    }),
    authorizationMiddleware('CREATE_DEPOSIT'),
    validateDTOMiddleware('body', {
      bank_id: joi.number().integer().required().messages({
        'any.required': `"bank id" is a required field`,
        'number.empty': `"bank id" can not be empty`
      }),
      origin_cpf: joi
        .string()
        .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
        .required()
        .messages({
          'any.required': '"origin cpf" is a required field',
          'string.empty': '"origin cpf" can not be empty'
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
    validateDTOMiddleware('params', {
      clientid: joi.number().integer().required().messages({
        'any.required': '"client id" is a required field',
        'number.empty': '"client id" can not be empty'
      })
    }),
    authorizationMiddleware('LIST_CLIENT_ID_TRANSACTION'),
    verifyIdDbMiddleware.verifyIdClientDbMiddleware,
    transactionController.listByIdUserTransactionController
  )

  router.route('/transaction/deposit/client/:clientid').get(
    authenticationMiddleware(),
    validateDTOMiddleware('params', {
      clientid: joi.number().integer().required().messages({
        'any.required': '"client id" is a required field',
        'number.empty': '"client id" can not be empty'
      })
    }),
    authorizationMiddleware('LIST_CLIENT_ID_DEPOSIT'),
    verifyIdDbMiddleware.verifyIdClientDbMiddleware,
    transactionController.listByIdUserDepositController
  )
}
