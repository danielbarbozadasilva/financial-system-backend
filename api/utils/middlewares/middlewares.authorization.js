const { decodeToken } = require('../utils.cryptography')
const { checkPermissionService } = require('../../services/services.user')
const ErrorAllowedUser = require('../errors/errors.user_not_allowed')

const authorizationMiddleware = (permission) => async (req, res, next) => {
  const { token } = req.headers
  const { type } = decodeToken(token)

  if (permission !== '*') {
    if (checkPermissionService(type, permission) === false) {
      throw new ErrorAllowedUser('Usuário não autorizado!')
    }
  }
  next()
}

module.exports = authorizationMiddleware
