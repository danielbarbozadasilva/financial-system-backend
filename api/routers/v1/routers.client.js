const joi = require('joi')
const clientController = require('../../controllers/controllers.client')
const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const verifyMiddleware = require('../../utils/middlewares/middlewares.verify-exists')

module.exports = (router) => {
  router
    .route('/client')
    .get(
      authenticationMiddleware(),
      authorizationMiddleware('SEARCH_FINANCIAL'),
      clientController.listAllClientsController
    )

  router
    .route('/client/:clientid')
    .get(
      authenticationMiddleware(),
      authorizationMiddleware('LIST_CLIENT_ID'),
      validateDTOMiddleware('params', {
        clientid: joi.number().integer().required().messages({
          'any.required': '"client id" is a required field',
          'number.empty': '"client id" can not be empty'
        })
      }),
      verifyMiddleware.verifyIdClientDbMiddleware,
      clientController.listByIdClientController
    )
    .put(
      authenticationMiddleware(),
      authorizationMiddleware('UPDATE_CLIENT'),
      validateDTOMiddleware('params', {
        clientid: joi.number().integer().required().messages({
          'any.required': '"client id" is a required field',
          'number.empty': '"client id" can not be empty'
        })
      }),
      validateDTOMiddleware('body', {
        name: joi.string().required().messages({
          'any.required': `"name" is a required field`,
          'string.empty': `"name" can not be empty`
        }),
        email: joi.string().required().messages({
          'any.required': `"email" is a required field`,
          'string.empty': `"email" can not be empty`
        }),
        cpf: joi.string().required().messages({
          'any.required': `"cpf" is a required field`,
          'string.empty': `"cpf" can not be empty`
        }),
        gender: joi.string().required().messages({
          'any.required': `"gender" is a required field`,
          'string.empty': `"gender" can not be empty`
        }),
        birth_date: joi.string().required().messages({
          'any.required': `"birth_date" is a required field`,
          'string.empty': `"birth_date" can not be empty`
        }),
        password: joi.string().required().messages({
          'any.required': `"password" is a required field`,
          'string.empty': `"password" can not be empty`
        }),
        phone: joi.string().required().messages({
          'any.required': `"phone" is a required field`,
          'string.empty': `"phone" can not be empty`
        }),
        cod_address: joi.number().integer().required().messages({
          'any.required': `"cod_address" is a required field`,
          'number.empty': `"cod_address" can not be empty`
        }),
        address: joi.string().required().messages({
          'any.required': `"address" is a required field`,
          'string.empty': `"address" can not be empty`
        }),
        uf: joi.string().required().messages({
          'any.required': `"uf" is a required field`,
          'string.empty': `"uf" can not be empty`
        }),
        city: joi.string().required().messages({
          'any.required': `"city" is a required field`,
          'string.empty': `"city" can not be empty`
        }),
        zip_code: joi.string().required().messages({
          'any.required': `"zip_code" is a required field`,
          'string.empty': `"zip_code" can not be empty`
        }),
        complement: joi.string().required().messages({
          'any.required': `"complement" is a required field`,
          'string.empty': `"complement" can not be empty`
        })
      }),
      verifyMiddleware.verifyIdClientDbMiddleware,
      verifyMiddleware.verifyCpfBodyExist,
      verifyMiddleware.verifyEmailBodyExist,
      clientController.updateClientController
    )

  router.route('/client/:clientid/status/:status').put(
    authenticationMiddleware(),
    authorizationMiddleware('UPDATE_STATUS_CLIENT'),
    validateDTOMiddleware('params', {
      clientid: joi.number().integer().required().messages({
        'any.required': '"client id" is a required field',
        'number.empty': '"client id" can not be empty'
      }),
      status: joi.number().integer().min(0).max(1).required().messages({
        'any.required': '"status" is a required field',
        'string.empty': '"status" can not be empty'
      })
    }),
    verifyMiddleware.verifyIdClientDbMiddleware,
    clientController.changeStatusClientController
  )
}
