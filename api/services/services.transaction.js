const {
  transaction,
  transaction_details,
  account,
  user,
  financial_asset_catalog
} = require('../models/models.index')
const transactionMapper = require('../mappers/mappers.transaction')

const createTransactionService = async (params, body) => {
  const accountDB = await account.findOne({
    where: { user_id: params.userid }
  })

  var checkBalance = Number(accountDB.balance) > Number(body.total_price)

  if (!checkBalance) {
    return {
      success: false,
      details: 'Saldo insuficiente para realizar a transação!'
    }
  }

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

const listAllUserTransactionService = async () => {
  const userDB = await transaction.findAll({
    include: [
      {
        model: user,
        as: 'user',
        right: true,
        where: { kind: 'client' }
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
    message: 'Ativo(s) listado(s) com sucesso!',
    data: userDB.map((item) => {
      return transactionMapper.toDTOAllUserAssets(item)
    })
  }
}

const listByIdUserTransactionService = async (id) => {
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
    message: 'Ativo(s) listado(s) com sucesso!',
    data: userDB.map((item) => {
      return transactionMapper.toDTOUserIdAssets(item)
    })
  }
}

module.exports = {
  createTransactionService,
  listAllUserTransactionService,
  listByIdUserTransactionService
}
