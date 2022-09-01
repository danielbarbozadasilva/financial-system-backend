const status = require('http-status')

const defaultMessage = 'an error happened'

class ErrorGeneric extends Error {
  constructor(message) {
    super(message)
    Error.captureStackTrace(this, ErrorGeneric)
    this.statusCode = status.INTERNAL_SERVER_ERROR
    this.message = message || defaultMessage
  }
}

module.exports = ErrorGeneric
