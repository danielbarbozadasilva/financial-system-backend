const status = require('http-status')

const defaultMessage = 'User is not allowed'
const ErrorGeneric = require('./erros.generic-error')

module.exports = class ErrorNotAuthorized extends ErrorGeneric {
  constructor(message) {
    super(message)
    Error.captureStackTrace(this, ErrorNotAuthorized)
    this.statusCode = status.FORBIDDEN
    this.message = message || defaultMessage
  }
}
