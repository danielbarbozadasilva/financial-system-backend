const md5 = require('md5')
const jwt = require('jsonwebtoken')

const md5_hash_secret = process.env.MD5_SECRET
const jwt_hash_secret = process.env.JWT_SECRET
const jwt_time_limit = process.env.JWT_VALID_TIME

const UtilCreateHash = (password) => {
  const verify_hash = md5(password + md5_hash_secret)
  if (verify_hash) {
    return verify_hash
  }
  return false
}

const UtilCreateToken = (model) => {
  const verify_data = jwt.sign({ ...model }, jwt_hash_secret, {
    expiresIn: `${jwt_time_limit}`
  })
  if (verify_data) {
    return verify_data
  }
  return false
}

const UtilDecodeToken = (token) => {
  const verify_decode = jwt.decode(token)
  if (verify_decode) {
    return verify_decode
  }
  return false
}
const UtilValidateToken = (token) => {
  const verify = jwt.verify(token, jwt_hash_secret)
  if (verify) {
    return verify
  }
  return false
}

module.exports = {
  UtilCreateHash,
  UtilCreateToken,
  UtilValidateToken,
  UtilDecodeToken
}
