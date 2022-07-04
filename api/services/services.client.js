const {
  user,
  address,
  transaction,
  transaction_details,
  financial_asset_catalog
} = require('../models/models.index')
const cryptography = require('../utils/utils.cryptography')
const clientMapper = require('../mappers/mappers.client')
const serviceUser = require('./services.user')

const listAllClientsService = async () => {
  const userDB = await transaction.findAll({
    include: [
      {
        model: user,
        as: 'user',
        right: true,
        where: { kind: 'client' },
        include: {
          model: address,
          as: 'address'
        }
      },
      {
        model: transaction_details,
        as: 'transaction_details',
        include: {
          model: financial_asset_catalog,
          as: 'financial_asset_catalog'
        }
      }
    ]
  })
  return {
    success: true,
    message: 'Clientes listados com sucesso!',
    data: userDB.map((item) => {
      return clientMapper.toDTO(item)
    })
  }
}

const listByIdClientService = async (id) => {
  const userDB = await user.findAll({
    include: [
      {
        model: address,
        as: 'address',
        required: true
      }
    ],
    where: { kind: 'client', cod_user: id },
    order: [['cod_user', 'ASC']]
  })

  return {
    success: true,
    message: 'Cliente listado com sucesso!',
    data: clientMapper.toDTOList(...userDB)
  }
}

const changeStatusService = async (clientId, status) => {
  const clientDB = await user.findByPk(clientId)
  if (!clientDB) {
    return {
      success: false,
      message: 'Operação não pode ser realizada!',
      details: ['Não existe um cliente com esse id']
    }
  }

  const resultDB = await user.update(
    {
      status: status
    },
    { where: { cod_user: clientId } }
  )

  if (resultDB) {
    return {
      success: true,
      message: 'Status atualizado com sucesso!',
      data: {
        name: clientDB.name,
        status: status
      }
    }
  }

  if (!resultDB) {
    return {
      success: false,
      message: 'Erro ao atualizar o status'
    }
  }
}

const updateClientService = async (clientId, body) => {
  const resultFind = await user.findByPk(clientId)

  if (!resultFind) {
    return {
      success: false,
      message: 'Operação não pode ser realizada!',
      details: ['Não existe um cliente com esse id']
    }
  }

  const resultEmail = await serviceUser.verifyEmailBodyExistService(
    clientId,
    body.email
  )
  if (resultEmail) {
    return {
      success: false,
      message: 'Já existe este e-mail em nossa base de dados',
      details: ['Este e-mail já está em uso']
    }
  }

  const resultCpf = await serviceUser.verifyCpfBodyExistService(
    clientId,
    body.cpf
  )
  if (resultCpf) {
    return {
      success: false,
      message: 'Já existe este cpf em nossa base de dados',
      details: ['Este cpf já está em uso']
    }
  }

  const addressDB = await address.update(
    {
      address: body.address,
      uf: body.uf,
      city: body.city,
      zip_code: body.zip_code,
      complement: body.complement
    },
    { where: { cod_address: body.cod_address } }
  )

  const clientDB = await user.update(
    {
      name: body.name,
      email: body.email,
      cpf: body.cpf,
      gender: body.gender,
      birth_date: body.birth_date,
      password: cryptography.UtilCreateHash(body.password),
      phone: body.phone,
      address_id: body.cod_address
    },
    { where: { cod_user: clientId } }
  )

  if (!clientDB || !addressDB) {
    return {
      success: false,
      message: 'Operação não pode ser realizada',
      details: ['Erro ao atualizar o cliente']
    }
  }

  return {
    success: true,
    message: 'Cliente atualizado com sucesso',
    data: { name: resultFind.name }
  }
}

module.exports = {
  listAllClientsService,
  listByIdClientService,
  updateClientService,
  changeStatusService
}
