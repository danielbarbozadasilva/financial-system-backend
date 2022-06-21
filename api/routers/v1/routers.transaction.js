const joi = require('joi')
const transactionController = require('../../controllers/controllers.transaction')
const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')

module.exports = (router) => {
  router.route('/transaction/user/:userid/asset/:assetid').post(
    authorizationMiddleware('CREATE_TRANSACTION'),
    middlewareValidateDTO('params', {
      userid: joi.number().integer().required().messages({
        'any.required': '"user id" is a required field',
        'string.empty': '"user id" can not be empty'
      }),
      assetid: joi.number().integer().required().messages({
        'any.required': '"asset id" is a required field',
        'string.empty': '"asset id" can not be empty'
      })
    }),
    middlewareValidateDTO('body', {
      current_price: joi.number().required().messages({
        'any.required': `"current_price" is a required field`,
        'string.empty': `"current_price" can not be empty`
      }),
      subtotal_price: joi.number().required().messages({
        'any.required': `"subtotal_price" is a required field`,
        'string.empty': `"subtotal_price" can not be empty`
      }),
      total_price: joi.number().required().messages({
        'any.required': `"total_price" is a required field`,
        'string.empty': `"total_price" can not be empty`
      }),
      quantity: joi.number().integer().required().messages({
        'any.required': `"quantity" is a required field`,
        'string.empty': `"quantity" can not be empty`
      })
    }),
    transactionController.createTransactionController
  )
}
