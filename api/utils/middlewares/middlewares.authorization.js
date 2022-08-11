const { decodeToken } = require('../utils.cryptography')
const { checkPermissionService } = require('../../services/services.user')

const authorizationMiddleware = (permission) => async (req, res, next) => {
  const { token } = req.headers
  const { type } = decodeToken(token)

  if (permission !== '*') {
    checkPermissionService(type, permission)
  }
  next()
}

module.exports = authorizationMiddleware
