const {
  transaction,
  transaction_details,
  account
} = require('../models/models.index')
const transactionMapper = require('../mappers/mappers.transaction')

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
  createTransactionService
}
