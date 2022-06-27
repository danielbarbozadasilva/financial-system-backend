const {
  transaction,
  transaction_details,
  account,
  user,
  financial_asset_catalog,
  transfer,
  bank
} = require('../models/models.index')
const transactionMapper = require('../mappers/mappers.transaction')
const { Op } = require('sequelize')

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
    type: 'ASSET',
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

const createDepositService = async (userid, body) => {
  const accountDB = await account.findOne({
    where: { user_id: userid }
  })

  accountDB.balance = Number(accountDB.balance) + Number(body.value)

  const transactionDB = await transaction.create({
    sub_total: body.value,
    total_price: body.value,
    user_id: userid
  })

  if (!transactionDB) {
    return {
      success: false,
      details: ['Erro ao cadastrar a transação!']
    }
  }

  const transferDB = await transfer.create({
    origin_cpf: body.origin_cpf,
    deposit_value: body.value,
    transaction_id: transactionDB.cod_transaction,
    bank_id: body.bank_id
  })

  if (!transferDB) {
    return {
      success: false,
      details: ['Erro ao realizar o depósito!']
    }
  }

  const resultDB = await accountDB.save()

  if (!resultDB) {
    return {
      success: false,
      details: ['Erro ao registrar o valor!']
    }
  }

  return {
    success: true,
    message: 'Transação cadastrada com sucesso!',
    data: transferDB
  }
}

const listAllUserTransactionService = async () => {
  const userDB = await transaction.findAll({
    include: [
      {
        model: user,
        as: 'user'
      },
      {
        model: transaction_details,
        as: 'transaction_details',
        where: {
          cod_trans_details: { [Op.ne]: null }
        },
        include: {
          model: financial_asset_catalog,
          as: 'financial_asset_catalog'
        }
      }
    ],
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

const listByIdUserTransactionService = async (id) => {
  const userDB = await transaction.findAll({
    include: [
      {
        model: user,
        as: 'user',
        where: { cod_user: id }
      },
      {
        model: transaction_details,
        as: 'transaction_details',
        where: {
          cod_trans_details: { [Op.ne]: null }
        },
        include: {
          model: financial_asset_catalog,
          as: 'financial_asset_catalog'
        }
      }
    ],
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

const listByIdUserDepositService = async (id) => {
  const userDB = await transfer.findAll({
    include: [
      {
        model: transaction,
        as: 'transaction',
        where: { user_id: id }
      },
      {
        model: bank,
        as: 'bank'
      }
    ],
    raw: true,
    nest: true
  })

  return {
    success: true,
    message: 'Ativo(s) listado(s) com sucesso!',
    data: userDB.map((item) => {
      return transactionMapper.toDTOListDeposit(item)
    })
  }
}

module.exports = {
  createTransactionService,
  createDepositService,
  listByIdUserDepositService,
  listAllUserTransactionService,
  listByIdUserTransactionService
}
