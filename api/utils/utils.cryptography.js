const md5 = require('md5')
const jwt = require('jsonwebtoken')
const ErrorNotAuthenticated = require('./errors/errors.user-not-authenticated')

const md5HashSecret = process.env.MD5_SECRET
const jwtHashSecret = process.env.JWT_SECRET
const jwtTimeLimit = process.env.JWT_VALID_TIME

const createHash = (password) => {
  const verifyHash = md5(password + md5HashSecret)
  if (verifyHash) {
    return verifyHash
  }
  return false
}

const createToken = (model) => {
  const verifyData = jwt.sign({ ...model }, jwtHashSecret, {
    expiresIn: `${jwtTimeLimit}`
  })
  if (verifyData) {
    return verifyData
  }
  return false
}

const decodeToken = (token) => {
  const verifyDecode = jwt.decode(token)
  if (verifyDecode) {
    return verifyDecode
  }
  return false
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
