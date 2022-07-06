const joi = require('joi')
const userController = require('../../controllers/controllers.user')
const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto')

module.exports = (router) => {
  router.route('/auth').post(
    middlewareValidateDTO('body', {
      cpf: joi.string().required().messages({
        'any.required': `"cpf" is a required field`,
        'string.empty': `"cpf" can not be empty`
      }),
      password: joi.string().required().messages({
        'any.required': `"password" is a required field`,
        'string.empty': `"password" can not be empty`
      })
    }),
    userController.authController
  )
  router.route('/register').post(
    middlewareValidateDTO('body', {
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
      status: joi.boolean().required().messages({
        'any.required': `"status" is a required field`,
        'string.empty': `"status" can not be empty`
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
      complement: joi.string().allow(""),
      auth: joi.boolean().optional()
    }),
    userController.registerController
  )
}
