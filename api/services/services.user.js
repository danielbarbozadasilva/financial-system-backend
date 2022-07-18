const { Op } = require('sequelize')
const {
  user,
  address,
  account,
  branch,
  sequelize
} = require('../models/models.index')
const cryptography = require('../utils/utils.cryptography')
const userMapper = require('../mappers/mappers.user')
const ErrorGeneric = require('../utils/errors/erros.generic_error')
const ErrorBusinessRule = require('../utils/errors/errors.business_rule')

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
      cpf,
      password: cryptography.UtilCreateHash(password)
    }
  })
  return !!userDB
}

const userIsActiveService = async (cpf) => {
  const resultDB = await user.findOne({
    where: {
      cpf,
      status: 1
    }
  })
  return !!resultDB
}

const searchTypeUserByIdService = (type) =>
  profile.find((item) => item.id === type)

const verifyFunctionalityProfileService = async (typeUser, test) => {
  const profile = searchTypeUserByIdService(typeUser)
  if (profile?.functionality?.includes(test) == true && profile.id) {
    return false
  }
  return true
}

const createCredentialService = async (cpf) => {
  const userDB = await user.findOne({
    where: { cpf }
  })

  const userDTO = userMapper.toUserDTO(userDB)
  const userToken = cryptography.UtilCreateToken(userDTO)

  if (userDTO && userToken) {
    return {
      token: userToken,
      userDTO
    }
  }
  return false
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
  const resultActive = await userIsActiveService(cpf)
  if (!resultActive) {
    return {
      success: false,
      message: 'Não fo possivel efetuar o login',
      details: ['Sua conta foi desativada pelo Administrador!']
    }
  }
  const resultCredentials = await createCredentialService(cpf)
  if (!resultCredentials) {
    return {
      success: false,
      details: ['Não foi possivel criar a credencial!']
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
      email
    }
  })
  return resultEmail
}

const verifyCpfExists = async (cpf) => {
  const resulCpf = await user.findOne({
    where: {
      cpf
    }
  })
  return !!resulCpf
}

const verifyEmailBodyExistService = async (id, email) => {
  const users = await user.findOne({
    where: {
      email,
      cod_user: { [Op.notIn]: [id] }
    }
  })
  return users !== null
}

const verifyCpfBodyExistService = async (id, cpf) => {
  const users = await user.findOne({
    where: {
      cpf,
      cod_user: { [Op.notIn]: [id] }
    }
  })
  return users !== null
}

const registerService = async (body) => {
  let data = {}
  const resultEmail = await verifyEmailExists(body.email)
  if (resultEmail) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }

  const resultCpf = await verifyCpfExists(body.cpf)
  if (resultCpf) {
    throw new ErrorBusinessRule('Este cpf já está em uso!')
  }

  const infoTransaction = await sequelize.transaction()
  try {
    const addressDB = await address.create(
      {
        address: body.address,
        uf: body.uf,
        city: body.city,
        zip_code: body.zip_code,
        complement: body.complement
      },
      { transaction: infoTransaction }
    )

    const userDB = await user.create(
      {
        name: body.name,
        email: body.email,
        cpf: body.cpf,
        gender: body.gender,
        birth_date: body.birth_date,
        password: cryptography.UtilCreateHash(body.password),
        phone: body.phone,
        kind: 'client',
        status: 'true',
        address_id: addressDB.cod_address
      },
      { transaction: infoTransaction }
    )

    const branchDB = await branch.create(
      {
        name: 'Agência 01'
      },
      { transaction: infoTransaction }
    )

    await account.create(
      {
        user_id: userDB.cod_user,
        branch_id: branchDB.cod_branch
      },
      { transaction: infoTransaction }
    )

    await infoTransaction.commit()

    if (body.auth) {
      data = await createCredentialService(body.cpf)
    }

    return {
      success: true,
      message: 'Cadastro realizado com sucesso!',
      data: data || userMapper.toUserRegister(userDB, addressDB)
    }
  } catch (error) {
    await infoTransaction.rollback()
    throw new ErrorGeneric('Não foi possivel realizar o cadastro!')
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
