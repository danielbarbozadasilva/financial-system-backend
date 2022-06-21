const {
  transaction,
  transaction_details,
  financial_asset_catalog,
  account,
  user,
  bank
} = require('../models/models.index')
const transactionMapper = require('../mappers/mappers.transaction')

const checkBalanceService = async (id) => {
  const userDB = await account.findByPk(id, {
    include: [
      {
        model: user,
        as: 'user',
        required: true
      },
      {
        model: bank,
        as: 'bank'
      }
    ]
  })

  return {
    success: true,
    message: 'Saldo listado com sucesso!',
    data: userDB
  }
}

const listUserAssetService = async (id) => {
  const userDB = await transaction.findAll({
    include: [
      {
        model: user,
        as: 'user',
        right: true,
        where: { cod_user: id }
      },
      {
        model: transaction_details,
        as: 'transaction_details',
        include: {
          model: financial_asset_catalog,
          as: 'financial_asset_catalog'
        }
      }
    ],
    order: [['user_id', 'ASC']],
    raw: true,
    nest: true
  })

  return {
    success: true,
    message: 'Saldo listado com sucesso!',
    data: transactionMapper.toDTOUserAssets(userDB)

  }
}

const createTransactionService = async (params, body) => {
  const transactionDB = await transaction.create({
    total_quantity: body.quantity,
    sub_total: body.subtotal_price,
    total_price: body.total_price,
    user_id: params.userid
  })

  if (!transactionDB) {
    return {
      success: false,
      details: ['Erro ao cadastrar a transação']
    }
  }

  const transactionDetailsDB = await transaction_details.create({
    quantity: body.quantity,
    purchase_price: body.current_price,
    financial_asset_id: params.assetid,
    transaction_id: transactionDB.cod_transaction
  })

  if (!transactionDetailsDB) {
    return {
      success: false,
      details: ['Erro ao cadastrar a transação']
    }
  }

  const accountDB = await account.findOne({
    where: { user_id: params.userid }
  })

  accountDB.balance = accountDB.balance - body.total_price

  const resultDB = await accountDB.save()

  if (!resultDB) {
    return {
      success: false,
      details: ['Erro ao atualizar o valor em conta']
    }
  }

  return {
    success: true,
    message: 'Ativo cadastrado com sucesso!',
    data: transactionMapper.toDTO(transactionDB, transactionDetailsDB)
  }
}

module.exports = {
  checkBalanceService,
  listUserAssetService,
  createTransactionService
}
