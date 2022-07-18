const { QueryTypes } = require('sequelize')
const { user, address, sequelize } = require('../models/models.index')
const ErrorGeneric = require('../utils/errors/erros.generic_error')
const ErrorBusinessRule = require('../utils/errors/errors.business_rule')

const cryptography = require('../utils/utils.cryptography')
const clientMapper = require('../mappers/mappers.client')
const serviceUser = require('./services.user')

const listAllClientsService = async () => {
  const userDB = await sequelize.query(
    'SELECT *, u.name as user_name FROM user u INNER JOIN address d ON u.address_id = d.cod_address LEFT JOIN transaction t on t.user_id=u.cod_user LEFT JOIN transaction_details td ON t.cod_transaction=td.transaction_id LEFT JOIN financial_asset_catalog f ON td.financial_asset_id = f.cod_fin_asset WHERE u.kind="client" GROUP BY u.cod_user ORDER BY u.name;',
    { type: QueryTypes.SELECT }
  )
  return {
    success: true,
    message: 'Cliente(s) listado(s) com sucesso!',
    data: userDB.map((item) => clientMapper.toDTO(item))
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
      status
    },
    { where: { cod_user: clientId } }
  )

  if (resultDB) {
    return {
      success: true,
      message: 'Status atualizado com sucesso!',
      data: {
        name: clientDB.name,
        status
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
    throw new ErrorBusinessRule('Não existe um cliente com esse id!')
  }

  const resultEmail = await serviceUser.verifyEmailBodyExistService(
    clientId,
    body.email
  )
  if (resultEmail) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }

  const resultCpf = await serviceUser.verifyCpfBodyExistService(
    clientId,
    body.cpf
  )
  if (resultCpf) {
    throw new ErrorBusinessRule('Este cpf já está em uso!')
  }

  const infoTransaction = await sequelize.transaction()

  try {
    await address.update(
      {
        address: body.address,
        uf: body.uf,
        city: body.city,
        zip_code: body.zip_code,
        complement: body.complement
      },
      { where: { cod_address: body.cod_address } },
      { transaction: infoTransaction }
    )

    await user.update(
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
      { where: { cod_user: clientId } },
      { transaction: infoTransaction }
    )
    await infoTransaction.commit()
  } catch (error) {
    await infoTransaction.rollback()
    throw new ErrorGeneric('Erro ao atualizar o cliente!')
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
