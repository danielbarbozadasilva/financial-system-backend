const { user } = require('../models/models.index')
const cryptography = require('../utils/utils.cryptography')
const userMapper = require('../mappers/mappers.user')

const profile = [
  {
    id: 1,
    functionality: [
      'SEARCH_FINANCIAL',
      'CREATE_FINANCIAL',
      'DELETE_FINANCIAL',
      'UPDATE_FINANCIAL'
    ]
  },
  {
    id: 2,
    functionality: ['SEARCH_FINANCIAL']
  }
]

const userIsValidService = async (email, password) => {
  const userDB = await user.findOne({
    where: {
      email: email,
      password: cryptography.UtilCreateHash(password)
    }
  })
  return userDB ? true : false
}

const searchTypeUserByIdService = (type) => {
  return profile.find((item) => {
    return item.id === type
  })
}

const verifyFunctionalityProfileService = async (typeUser, test) => {
  const profile = searchTypeUserByIdService(typeUser)
  if (profile?.functionality?.includes(test) == true && profile.id) {
    return false
  } else {
    return true
  }
}

const createCredentialService = async (email) => {
  const userDB = await user.findOne({
    where: {
      email: email
    }
  })

  const userDTO = userMapper.toUserDTO(userDB)
  const userToken = cryptography.UtilCreateToken(userDTO)

  if (userDTO && userToken) {
    return {
      token: userToken,
      userDTO
    }
    return false
  }
}

const authService = async (email, password) => {
  const resultDB = await userIsValidService(email, password)
  if (!resultDB) {
    return {
      success: false,
      message: 'Unable to authenticate user',
      details: ['Invalid username or password']
    }
  }
  const resultCredentials = await createCredentialService(email)
  if (!resultCredentials) {
    return {
      success: false,
      details: ['it was not possible to create the credential']
    }
  }
  return {
    success: true,
    message: 'Successfully authenticated user',
    data: resultCredentials
  }
}

const verifyEmailExists = async (email) => {
  const resultEmail = await user.findOne({
    where: {
      email: email
    }
  })
  return resultEmail
}

const verifyCpfExists = async (cpf) => {
  const resulCpf = await user.findOne({
    where: {
      cpf: cpf
    }
  })
  return resulCpf ? true : false
}


module.exports = {
  authService,
  verifyEmailExists,
  verifyFunctionalityProfileService
}
