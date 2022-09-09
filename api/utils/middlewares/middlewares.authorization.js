const { decodeToken } = require('../utils.cryptography')
const { checkPermissionService } = require('../../services/services.user')

const authorizationMiddleware = (permission) => async (req, res, next) => {
  if (permission !== '*') {
    const { token } = req.headers
    const { type } = decodeToken(token)

    checkPermissionService(type, permission)
  }
  next()
}

module.exports = authorizationMiddleware
