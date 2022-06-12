const joi = require('joi')
const financialController = require('../../controllers/controllers.financial_asset')

module.exports = (router) => {
  router
    .route('/financial')
    .get(financialController.listAllFinancialAssetsController)
    .post(
      authorizationMiddleware('CREATE_FINANCIAL'),
      middlewareFileUploadMiddleware('financial', true),
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
            'string.empty': `"current_price" can not be empty`
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
    .put(
      authorizationMiddleware('UPDATE_FINANCIAL'),
      middlewareFileUploadMiddleware('financial'),
      middlewareValidateDTO('params', {
        financialid: joi.number().integer().required().messages({
          'any.required': '"financial id" is a required field',
          'string.empty': '"financial id" can not be empty',
          'string.regex': '"financial id" out of the expected format'
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
            'string.empty': `"current_price" can not be empty`
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
      financialController.updateFinancialAssetsController
    )
}
