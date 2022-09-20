const joi = require('joi')
const financialController = require('../../controllers/controllers.financial_asset')
const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const middlewareFileUploadMiddleware = require('../../utils/middlewares/middlewares.file-upload')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')

module.exports = (router) => {
  router
    .route('/financial')
    .get(financialController.listAllFinancialAssetsController)

    .post(
      authenticationMiddleware(),
      authorizationMiddleware('CREATE_FINANCIAL'),
      middlewareFileUploadMiddleware('financial'),
      validateDTOMiddleware(
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
          quantity: joi.number().required().messages({
            'any.required': `"quantity" is a required field`,
            'number.empty': `"quantity" can not be empty`
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
      authenticationMiddleware(),
      validateDTOMiddleware('params', {
        financialid: joi.number().integer().required().messages({
          'any.required': '"financial id" is a required field',
          'number.empty': '"financial id" can not be empty'
        })
      }),
      authorizationMiddleware('SEARCH_FINANCIAL'),
      verifyIdDbMiddleware.verifyIdFinancialDbMiddleware,
      financialController.listByIdFinancialAssetsController
    )

    .put(
      authenticationMiddleware(),
      middlewareFileUploadMiddleware('financial'),
      validateDTOMiddleware('params', {
        financialid: joi.number().integer().required().messages({
          'any.required': '"financial id" is a required field',
          'number.empty': '"financial id" can not be empty'
        })
      }),
      authorizationMiddleware('UPDATE_FINANCIAL'),
      validateDTOMiddleware(
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
          quantity: joi.number().required().messages({
            'any.required': `"quantity" is a required field`,
            'number.empty': `"quantity" can not be empty`
          })
        },
        {
          allowUnknown: true
        }
      ),
      verifyIdDbMiddleware.verifyIdFinancialDbMiddleware,
      financialController.updateFinancialAssetsController
    )

    .delete(
      authenticationMiddleware(),
      validateDTOMiddleware('params', {
        financialid: joi.number().integer().required().messages({
          'any.required': '"financial id" is a required field',
          'number.empty': '"financial id" can not be empty'
        })
      }),
      authorizationMiddleware('DELETE_FINANCIAL'),
      verifyIdDbMiddleware.verifyIdFinancialDbMiddleware,
      financialController.deleteFinancialAssetsController
    )

  router
    .route('/financial/assets/top05')
    .get(financialController.listTop05FinancialAssetsController)
}
