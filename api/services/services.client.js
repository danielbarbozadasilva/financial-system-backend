const { QueryTypes } = require('sequelize')
const { user, address, sequelize } = require('../models/models.index')
const ErrorGeneric = require('../utils/errors/erros.generic-error')
const cryptography = require('../utils/utils.cryptography')
const clientMapper = require('../mappers/mappers.client')

const listAllClientsService = async () => {
  try {
    const userDB = await sequelize.query(
      'SELECT *, u.name as user_name FROM user u INNER JOIN address d ON u.address_id = d.cod_address LEFT JOIN transaction t on t.user_id=u.cod_user LEFT JOIN transactiondetails td ON t.cod_transaction=td.transaction_id LEFT JOIN assets f ON td.financial_asset_id = f.cod_fin_asset WHERE u.kind="client" GROUP BY u.cod_user ORDER BY u.name;',
      { type: QueryTypes.SELECT }
    )
    return {
      success: true,
      message: 'Clientes listados com sucesso!',
      data: userDB.map((item) => clientMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric('Erro ao listar os clientes!')
  }
}

const listByIdClientService = async (id) => {
  try {
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
  } catch (err) {
    throw new ErrorGeneric('Erro ao listar o cliente!')
  }
}

const changeStatusService = async (clientId, status) => {
  try {
    await user.update({ status }, { where: { cod_user: clientId } })
    return {
      success: true,
      message: 'Status atualizado com sucesso!'
    }
  } catch (err) {
    throw new ErrorGeneric('Erro ao alterar o status do cliente!')
  }
}

const updateClientService = async (clientId, body) => {
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
      { infoTransaction }
    )

    await user.update(
      {
        name: body.name,
        email: body.email,
        cpf: body.cpf,
        gender: body.gender,
        kind: 'client',
        birth_date: body.birth_date,
        password: cryptography.createHash(body.password),
        phone: body.phone,
        address_id: body.cod_address
      },
      { where: { cod_user: clientId } },
      { transaction: infoTransaction }
    )
    await infoTransaction.commit()
    return {
      success: true,
      message: 'Cliente atualizado com sucesso'
    }
  } catch (error) {
    await infoTransaction.rollback()
    throw new ErrorGeneric('Erro ao atualizar o cliente!')
  }
}

module.exports = {
  listAllClientsService,
  listByIdClientService,
  updateClientService,
  changeStatusService
}
