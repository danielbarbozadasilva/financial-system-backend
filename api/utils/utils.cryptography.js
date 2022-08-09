const md5 = require('md5')
const jwt = require('jsonwebtoken')

const md5HashSecret = process.env.MD5_SECRET
const jwtHashSecret = process.env.JWT_SECRET
const jwtTimeLimit = process.env.JWT_VALID_TIME

const createHash = (password) => {
  const verify_hash = md5(password + md5HashSecret)
  if (verify_hash) {
    return verify_hash
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
    if (token) {
      const verify = jwt.verify(token, jwtHashSecret)
      if (verify) {
        return true
      }
    }
    return false
  } catch (err) {}
}

module.exports = {
  createHash,
  createToken,
  tokenIsValid,
  decodeToken
}
