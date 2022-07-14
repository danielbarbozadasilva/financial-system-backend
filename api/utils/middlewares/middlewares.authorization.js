const cryptographyUtils = require('../utils.cryptography')
const userService = require('../../services/services.user')
const ErrorUserNotAllowed = require('../errors/errors.user_not_allowed')
const ErrorUnauthenticatedUser = require('../errors/errors.user_not_authenticated')

const authorizationMiddleware =
  (rota = '*') =>
  async (req, res, next) => {
    const test = rota
    const { token } = req.headers
    const { type } = cryptographyUtils.UtilDecodeToken(token)

    await userService
      .verifyFunctionalityProfileService(type, test)
      .then((result) => {
        if (test != '*') {
          if (!token) {
            return Promise.reject(
              new ErrorUnauthenticatedUser('Usuário não autenticado!')
            )
          }

          if (!cryptographyUtils.UtilValidateToken(token)) {
            return Promise.reject(
              new ErrorUnauthenticatedUser('Usuário não autenticado!')
            )
          }

          if (result) {
            return Promise.reject(
              new ErrorUserNotAllowed('Usuário não autorizado!')
            )
          }
        }

        return Promise.resolve(next())
      })
      .catch((e) => {
        res
          .status(e.statusCode || 401)
          .send({ success: false, error: { message: e.message } })
      })
  }

module.exports = authorizationMiddleware
