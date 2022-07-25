const status = require('http-status')
const defaultMessage = 'User is not authorized'
const ErrorGeneric = require('./erros.generic_error')

module.exports = class ErrorUnauthorizedUser extends ErrorGeneric {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, ErrorUnauthorizedUser)
    this.statusCode = status.UNAUTHORIZED
    this.message = message || defaultMessage
  }
}
