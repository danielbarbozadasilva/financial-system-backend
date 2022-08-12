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
const ErrorAllowedUser = require('../utils/errors/errors.user_not_allowed')
const ErrorUnauthorizedUser = require('../utils/errors/errors.user_not_authenticated')

const profile = [
  {
    type: 1,
    permission: [
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
    type: 2,
    permission: [
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
      password: cryptography.createHash(password)
    }
  })
  if (!userDB) {
    throw new ErrorUnauthorizedUser('Cpf ou senha inválidos!')
  }
}

const userIsActiveService = async (cpf) => {
  const resultDB = await user.findOne({
    where: {
      cpf,
      status: 1
    }
  })
  if (!resultDB) {
    throw new ErrorAllowedUser('Sua conta foi desativada pelo Administrador!')
  }
}

const checkPermissionService = (type, permission) => {
  const result = profile.find((item) => item.type === type)
  const check = result?.permission?.includes(permission)
  if (!check) {
    throw new ErrorAllowedUser('Usuário não autorizado!')
  }
}

const createCredentialService = async (cpf) => {
  const userDB = await user.findOne({
    where: { cpf }
  })

  const userDTO = userMapper.toUserDTO(userDB)
  const userToken = cryptography.createToken(userDTO)

  if (userDTO && userToken) {
    return {
      token: userToken,
      userDTO
    }
  }
  return false
}

const authService = async (cpf, password) => {
  await userIsValidService(cpf, password)
  await userIsActiveService(cpf)
  try {
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
  } catch (err) {
    throw new ErrorGeneric('Erro ao realizar a operação!')
  }
}

const registerService = async (body) => {
  let data = {}

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
        password: cryptography.createHash(body.password),
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
      data: data?.token ? data : userMapper.toUserRegister(userDB, addressDB)
    }
  } catch (error) {
    await infoTransaction.rollback()
    throw new ErrorGeneric('Não foi possivel realizar o cadastro!')
  }
}

module.exports = {
  authService,
  registerService,
  checkPermissionService
}
