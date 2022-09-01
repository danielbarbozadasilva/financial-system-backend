const status = require('http-status')

const defaultMessage = 'Could not process the instructions present'
const ErrorGeneric = require('./erros.generic-error')

module.exports = class ErrorUnprocessableEntity extends ErrorGeneric {
  constructor(message) {
    super(message)
    Error.captureStackTrace(this, ErrorUnprocessableEntity)
    this.statusCode = status.UNPROCESSABLE_ENTITY
    this.message = message || defaultMessage
  }
}
