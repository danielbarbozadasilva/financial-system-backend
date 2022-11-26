const { decodeToken } = require('../utils.cryptography')
const services = require('../../services/services.user')

const authorizationMiddleware = (permission) => async (req, res, next) => {
  const { token } = req.headers
  const { type } = decodeToken(token)

  if (permission !== '*') {
    services.checkPermissionService(type, permission)
  }
  
  next()
}

module.exports = authorizationMiddleware
