const joi = require('joi')
const financialController = require('../../controllers/controllers.financial_asset')
const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const middlewareFileUploadMiddleware = require('../../utils/middlewares/middlewares.file_upload')
const asyncMiddleware = require('../../utils/middlewares/middlewares.async')

module.exports = (router) => {
  router
    .route('/financial')
    .get(
      authorizationMiddleware('*'),
      financialController.listAllFinancialAssetsController
    )

    .post(
      authorizationMiddleware('CREATE_FINANCIAL'),
      asyncMiddleware(middlewareFileUploadMiddleware('financial')),
      middlewareValidateDTO(
        'body',
        {
          name: joi.string().required().messages({
            'any.required': `"name" is a required field`,
            'string.empty': `"name" can not be empty`
          }),
          description: joi.string().required().messages({
            'any.required': `"description" is a required field`,
            'string.empty': `"description" can not be empty`
          }),
          bvmf: joi.string().required().messages({
            'any.required': `"bvmf" is a required field`,
            'string.empty': `"bvmf" can not be empty`
          }),
          current_price: joi.number().required().messages({
            'any.required': `"current_price" is a required field`,
            'number.empty': `"current_price" can not be empty`
          }),
          quantity: joi.string().required().messages({
            'any.required': `"quantity" is a required field`,
            'string.empty': `"quantity" can not be empty`
          })
        },
        {
          allowUnknown: true
        }
      ),
      financialController.createFinancialAssetsController
    )

  router
    .route('/financial/:financialid')
    .get(
      authorizationMiddleware('SEARCH_FINANCIAL'),
      middlewareValidateDTO('params', {
        financialid: joi.number().integer().required().messages({
          'any.required': '"financial id" is a required field',
          'number.empty': '"financial id" can not be empty'
        })
      }),
      asyncMiddleware(financialController.listByIdFinancialAssetsController)
    )

    .put(
      authorizationMiddleware('UPDATE_FINANCIAL'),
      asyncMiddleware(middlewareFileUploadMiddleware('financial')),
      middlewareValidateDTO('params', {
        financialid: joi.number().integer().required().messages({
          'any.required': '"financial id" is a required field',
          'number.empty': '"financial id" can not be empty'
        })
      }),
      middlewareValidateDTO(
        'body',
        {
          name: joi.string().required().messages({
            'any.required': `"name" is a required field`,
            'string.empty': `"name" can not be empty`
          }),
          description: joi.string().required().messages({
            'any.required': `"description" is a required field`,
            'string.empty': `"description" can not be empty`
          }),
          bvmf: joi.string().required().messages({
            'any.required': `"bvmf" is a required field`,
            'string.empty': `"bvmf" can not be empty`
          }),
          current_price: joi.number().required().messages({
            'any.required': `"current_price" is a required field`,
            'number.empty': `"current_price" can not be empty`
          }),
          quantity: joi.string().required().messages({
            'any.required': `"quantity" is a required field`,
            'string.empty': `"quantity" can not be empty`
          })
        },
        {
          allowUnknown: true
        }
      ),
      asyncMiddleware(financialController.updateFinancialAssetsController)
    )

    .delete(
      authorizationMiddleware('DELETE_FINANCIAL'),
      middlewareValidateDTO('params', {
        financialid: joi.number().integer().required().messages({
          'any.required': '"financial id" is a required field',
          'number.empty': '"financial id" can not be empty'
        })
      }),
      financialController.deleteFinancialAssetsController
    )

  router
    .route('/financial/assets/top05')
    .get(
      authorizationMiddleware('*'),
      financialController.listTop05FinancialAssetsController
    )
}
