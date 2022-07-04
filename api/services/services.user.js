const { user, address, account } = require('../models/models.index')
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
      'UPDATE_CLIENT',
      'LIST_CLIENT_TRANSACTION',
      'LIST_CLIENT_ID_TRANSACTION',
      'CREATE_DEPOSIT',
      'LIST_BANKS',
      'LIST_CLIENT_BALANCE',
      'LIST_ACCOUNT',
      'LIST_ID_ACCOUNT',
      'LIST_CLIENT_ID_DEPOSIT'
    ]
  },
  {
    id: 2,
    functionality: [
      'SEARCH_FINANCIAL',
      'CREATE_TRANSACTION',
      'LIST_CLIENT_BALANCE',
      'LIST_CLIENT_ID_TRANSACTION',
      'LIST_BANKS'
    ]
  }
]

const userIsValidService = async (cpf, password) => {
  const userDB = await user.findOne({
    where: {
      cpf: cpf,
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

const createCredentialService = async (cpf) => {
  const userDB = await account.findOne({
    include: [
      {
        model: user,
        as: 'user',
        right: true,
        required: false,
        where: {
          cpf: cpf
        }
      }
    ]
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

const authService = async (cpf, password) => {
  const resultDB = await userIsValidService(cpf, password)
  if (!resultDB) {
    return {
      success: false,
      message: 'Não foi possivel autenticar o usuário',
      details: ['Cpf ou senha inválidos!']
    }
  }
  const resultCredentials = await createCredentialService(cpf)
  if (!resultCredentials) {
    return {
      success: false,
      details: ['Foi foi possivel criar uma credencial!']
    }
  }
  return {
    success: true,
    message: 'Usuário autenticado com sucesso!',
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
