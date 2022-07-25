const Joi = require('joi')

const MiddlewareValidateDTO = (type, params, options = {}) => {
  return (req, res, next) => {
    const schema = Joi.object().keys(params)
    const result = schema.validate(req[type], {
      allowUnknown: false,
      ...options
    })

    if (result.error) {
      const message = result.error.details.reduce((acc, item) => {
        return [...acc, item.message]
      }, [])

      return res.status(400).send({
        success: false,
        details: [...message]
      })
    }

    return next()
  }
}
module.exports = MiddlewareValidateDTO
