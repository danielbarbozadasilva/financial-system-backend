const { tokenIsValid } = require('../utils.cryptography')
const ErrorUnauthenticatedUser = require('../errors/errors.user_not_authenticated')

const authenticationMiddleware = () => async (req, res, next) => {
  const { token } = req.headers
  if (tokenIsValid(token) === false) {
    throw new ErrorUnauthenticatedUser('Usuário não autenticado!')
  }
  next()
}

module.exports = authenticationMiddleware
