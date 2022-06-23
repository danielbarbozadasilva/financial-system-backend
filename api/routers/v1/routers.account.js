const joi = require('joi')
const accountController = require('../../controllers/controllers.account')
const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')

module.exports = (router) => {
  router.route('/client/:clientid/account').get(
    authorizationMiddleware('LIST_CLIENT_BALANCE'),
    middlewareValidateDTO('params', {
      clientid: joi.number().integer().required().messages({
        'any.required': '"client id" is a required field',
        'number.empty': '"client id" can not be empty'
      })
    }),
    accountController.checkBalanceController
  )
}
