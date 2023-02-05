const md5 = require('md5')
const jwt = require('jsonwebtoken')
const ErrorNotAuthenticated = require('../exceptions/errors.user-not-authenticated')
const ErrorGeneric = require('../exceptions/erros.generic-error')

const md5HashSecret = process.env.MD5_SECRET
const jwtHashSecret = process.env.JWT_SECRET
const jwtTimeLimit = process.env.JWT_VALID_TIME

const createHash = (password) => {
  try {
    return md5(password + md5HashSecret)
  } catch (error) {
    throw new ErrorGeneric(`Error creating hash! ${error}`)
  }
}

const createToken = (model) => {
  try {
    return jwt.sign({ ...model }, jwtHashSecret, {
      expiresIn: `${jwtTimeLimit}`
    })
  } catch (error) {
    throw new ErrorGeneric(`Error generating token! ${error}`)
  }
}

const decodeToken = (token) => {
  try {
    return jwt.decode(token)
  } catch (error) {
    throw new ErrorGeneric(`Error decoding token! ${error}`)
  }
}

const tokenIsValid = (token) => {
  try {
    jwt?.verify(token, jwtHashSecret)
  } catch (err) {
    throw new ErrorNotAuthenticated('Usuário não autenticado!')
  }
}

module.exports = {
  createHash,
  createToken,
  tokenIsValid,
  decodeToken
}
