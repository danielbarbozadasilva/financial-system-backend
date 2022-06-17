const { user, address } = require('../models/models.index')
const cryptography = require('../utils/utils.cryptography')
const userMapper = require('../mappers/mappers.user')
const { Op } = require('sequelize')

const profile = [
  {
    id: 1,
    functionality: [
      'SEARCH_FINANCIAL',
      'CREATE_FINANCIAL',
      'DELETE_FINANCIAL',
      'UPDATE_FINANCIAL',
      'LIST_CLIENT',
      'LIST_CLIENT_ID',
      'UPDATE_STATUS_CLIENT',
      'UPDATE_CLIENT'
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

const verifyEmailBodyExistService = async (id, email) => {
  const users = await user.findOne({
    where: {
      email: email,
      cod_user: { [Op.notIn]: [id] }
    }
  })
  return users === null ? false : true
}

const verifyCpfBodyExistService = async (id, cpf) => {
  const users = await user.findOne({
    where: {
      cpf: cpf,
      cod_user: { [Op.notIn]: [id] }
    }
  })
  return users === null ? false : true
}

const registerService = async (body) => {
  const resultEmail = await verifyEmailExists(body.email)
  if (resultEmail) {
    return {
      success: false,
      message: 'Já existe este e-mail em nossa base de dados',
      details: ['Este e-mail já está em uso']
    }
  }

  const resultCpf = await verifyCpfExists(body.cpf)
  if (resultCpf) {
    return {
      success: false,
      message: 'Já existe este cpf em nossa base de dados',
      details: ['Este cpf já está em uso']
    }
  }

  const addressDB = await address.create({
    address: body.address,
    uf: body.uf,
    city: body.city,
    zip_code: body.zip_code,
    complement: body.complement
  })

  const userDB = await user.create({
    name: body.name,
    email: body.email,
    cpf: body.cpf,
    gender: body.gender,
    birth_date: body.birth_date,
    password: cryptography.UtilCreateHash(body.password),
    status: body.status,
    phone: body.phone,
    kind: 'client',
    address_id: addressDB.cod_address
  })

  if (body.auth) {
    var data = await createCredentialService(body.email)
  }

  return {
    success: true,
    message: 'Cadastro realizado com sucesso!',
    data: data || userMapper.toUserRegister(userDB, addressDB)
  }
}

module.exports = {
  authService,
  registerService,
  verifyEmailExists,
  verifyCpfExists,
  verifyEmailBodyExistService,
  verifyCpfBodyExistService,
  verifyFunctionalityProfileService
}
