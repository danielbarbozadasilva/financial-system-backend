const { tokenIsValid } = require('../utils.cryptography')

const authenticationMiddleware = () => async (req, res, next) => {
  const { token } = req.headers
  tokenIsValid(token)
  next()
}

module.exports = authenticationMiddleware
