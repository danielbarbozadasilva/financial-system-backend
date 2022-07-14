const joi = require('joi')
const transactionController = require('../../controllers/controllers.transaction')
const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const asyncMiddleware = require('../../utils/middlewares/middlewares.async')

module.exports = (router) => {
  router.route('/transaction/client/:clientid/asset/:assetid').post(
    authorizationMiddleware('*'),
    middlewareValidateDTO('params', {
      clientid: joi.number().integer().required().messages({
        'any.required': '"client id" is a required field',
        'number.empty': '"client id" can not be empty'
      }),
      assetid: joi.number().integer().required().messages({
        'any.required': '"asset id" is a required field',
        'number.empty': '"asset id" can not be empty'
      })
    }),
    middlewareValidateDTO('body', {
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
    asyncMiddleware(transactionController.createTransactionController)
  )

  router.route('/transaction/deposit/client/:clientid').post(
    authorizationMiddleware('CREATE_DEPOSIT'),
    middlewareValidateDTO('params', {
      clientid: joi.number().integer().required().messages({
        'any.required': '"client id" is a required field',
        'number.empty': '"client id" can not be empty'
      })
    }),
    middlewareValidateDTO('body', {
      bank_id: joi.number().integer().required().messages({
        'any.required': `"bank id" is a required field`,
        'string.empty': `"bank id" can not be empty`
      }),
      branch: joi.string().required().messages({
        'any.required': `"branch" is a required field`,
        'string.empty': `"branch" can not be empty`
      }),
      user_id: joi.number().integer().required().messages({
        'any.required': '"client id" is a required field',
        'number.empty': '"client id" can not be empty'
      }),
      origin_cpf: joi.string().required().messages({
        'any.required': `"origin_cpf" is a required field`,
        'string.empty': `"origin_cpf" can not be empty`
      }),
      value: joi.number().required().messages({
        'any.required': `"value" is a required field`,
        'number.empty': `"value" can not be empty`
      })
    }),
    asyncMiddleware(transactionController.createDepositController)
  )

  router
    .route('/transaction/client')
    .get(
      authorizationMiddleware('LIST_CLIENT_TRANSACTION'),
      transactionController.listAllUserTransactionController
    )

  router.route('/transaction/client/:clientid').get(
    authorizationMiddleware('LIST_CLIENT_ID_TRANSACTION'),
    middlewareValidateDTO('params', {
      clientid: joi.number().integer().required().messages({
        'any.required': '"client id" is a required field',
        'number.empty': '"client id" can not be empty'
      })
    }),
    transactionController.listByIdUserTransactionController
  )

  router.route('/transaction/deposit/client/:clientid').get(
    authorizationMiddleware('LIST_CLIENT_ID_DEPOSIT'),
    middlewareValidateDTO('params', {
      clientid: joi.number().integer().required().messages({
        'any.required': '"client id" is a required field',
        'number.empty': '"client id" can not be empty'
      })
    }),
    transactionController.listByIdUserDepositController
  )
}
