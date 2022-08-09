const Joi = require('joi')
const ErrorBusinessRule = require('../errors/errors.business_rule')

const validateDTOMiddleware = (type, params, options = {}) => {
  return async (req, res, next) => {
    const schema = Joi.object().keys(params)

    const result = schema.validate(req[type], {
      allowUnknown: false,
      ...options
    })

    if (result.error) {
      const message = result.error.details.reduce((acc, item) => {
        return [...acc, item.message]
      }, [])
      throw new ErrorBusinessRule(message)
    }

    return next()
  }
}
module.exports = validateDTOMiddleware
