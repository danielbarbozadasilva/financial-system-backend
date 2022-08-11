const joi = require('joi')
const financialController = require('../../controllers/controllers.financial_asset')
const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate_dto')
const middlewareFileUploadMiddleware = require('../../utils/middlewares/middlewares.file_upload')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify_exists')
const asyncMiddleware = require('../../utils/middlewares/middlewares.async')

module.exports = (router) => {
  router
    .route('/financial')
    .get(
      asyncMiddleware(authorizationMiddleware('*')),
      asyncMiddleware(financialController.listAllFinancialAssetsController)
    )

    .post(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('CREATE_FINANCIAL')),
      asyncMiddleware(middlewareFileUploadMiddleware('financial')),
      asyncMiddleware(
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
        )
      ),
      asyncMiddleware(financialController.createFinancialAssetsController)
    )

  router
    .route('/financial/:financialid')
    .get(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('SEARCH_FINANCIAL')),
      asyncMiddleware(
        validateDTOMiddleware('params', {
          financialid: joi.number().integer().required().messages({
            'any.required': '"financial id" is a required field',
            'number.empty': '"financial id" can not be empty'
          })
        })
      ),
      asyncMiddleware(verifyIdDbMiddleware.verifyIdFinancialDbMiddleware),
      asyncMiddleware(financialController.listByIdFinancialAssetsController)
    )

    .put(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('UPDATE_FINANCIAL')),
      asyncMiddleware(middlewareFileUploadMiddleware('financial')),
      asyncMiddleware(
        validateDTOMiddleware('params', {
          financialid: joi.number().integer().required().messages({
            'any.required': '"financial id" is a required field',
            'number.empty': '"financial id" can not be empty'
          })
        })
      ),
      asyncMiddleware(
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
        )
      ),
      asyncMiddleware(verifyIdDbMiddleware.verifyIdFinancialDbMiddleware),
      asyncMiddleware(financialController.updateFinancialAssetsController)
    )

    .delete(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('DELETE_FINANCIAL')),
      asyncMiddleware(
        validateDTOMiddleware('params', {
          financialid: joi.number().integer().required().messages({
            'any.required': '"financial id" is a required field',
            'number.empty': '"financial id" can not be empty'
          })
        })
      ),
      asyncMiddleware(verifyIdDbMiddleware.verifyIdFinancialDbMiddleware),
      asyncMiddleware(financialController.deleteFinancialAssetsController)
    )

  router
    .route('/financial/assets/top05')
    .get(
      asyncMiddleware(authorizationMiddleware('*')),
      asyncMiddleware(financialController.listTop05FinancialAssetsController)
    )
}
