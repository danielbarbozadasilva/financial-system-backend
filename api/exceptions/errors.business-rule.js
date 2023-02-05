const status = require('http-status')

const defaultMessage = 'A business mistake happened'
const ErrorGeneric = require('./erros.generic-error')

module.exports = class ErrorBusinessRule extends ErrorGeneric {
  constructor(message) {
    super(message)
    Error.captureStackTrace(this, ErrorBusinessRule)
    this.statusCode = status.BAD_REQUEST
    this.message = message || defaultMessage
  }
}
