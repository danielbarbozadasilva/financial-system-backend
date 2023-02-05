const defaultMessage = 'User is not authorized'
const ErrorGeneric = require('./erros.generic-error')

module.exports = class ErrorNotAuthenticated extends ErrorGeneric {
  constructor(message) {
    super(message)
    Error.captureStackTrace(this, ErrorNotAuthenticated)
    this.statusCode = 401
    this.message = message || defaultMessage
  }
}
