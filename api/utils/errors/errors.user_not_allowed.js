const status = require('http-status')

const defaultMessage = 'User is not allowed'
const ErrorGeneric = require('./erros.generic_error')

module.exports = class ErrorAllowedUser extends ErrorGeneric {
  constructor(message) {
    super(message)
    Error.captureStackTrace(this, ErrorAllowedUser)
    this.statusCode = status.FORBIDDEN
    this.message = message || defaultMessage
  }
}
