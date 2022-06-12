const ErrorGeneric = require('../errors/erros.generic_error')

const asyncMiddleware = (fn, options) => (req, res, next) => {
  fn(req, res, next).catch((err) => {
    if (err instanceof ErrorGeneric) {
      return res.status(err.statusCode).send({
        details: [err.message]
      })
    }
    return res.status(500).send({
      message: 'An internal error occurred, request solution admin'
    })
  })
}

module.exports = asyncMiddleware
