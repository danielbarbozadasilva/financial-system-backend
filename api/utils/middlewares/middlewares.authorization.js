const { decodeToken } = require('../utils.cryptography')
const services = require('../../services/services.user')

const authorizationMiddleware = (permission) => async (req, res, next) => {
  const { token } = req.headers
  const { id, type } = decodeToken(token)
  const { clientid } = req.params

  if (permission !== '*') {
    services.checkIdAuthorizationService(id, clientid, type)
    services.checkPermissionService(type, permission)
  }
  next()
}

module.exports = authorizationMiddleware
