const { Op } = require('sequelize')
const {
  transaction,
  transaction_details,
  account,
  user,
  financial_asset_catalog,
  transfer,
  bank,
  sequelize
} = require('../models/models.index')
const transactionMapper = require('../mappers/mappers.transaction')
const ErrorGeneric = require('../utils/errors/erros.generic_error')

const verifyQuantity = async (assetid, quantity) => {
  const result = await financial_asset_catalog.findByPk(assetid)
  const checkCount = Number(result.quantity) >= Number(quantity)
  return checkCount
}

const verifyBalance = async (id, total_price) => {
  const result = await account.findOne({
    where: { user_id: id }
  })
  const checkCount = Number(result.balance) >= Number(total_price)
  return checkCount
}

const createTransactionService = async (params, body) => {
  const balance = await verifyBalance(params.clientid, body.total_price)
  if (!balance) {
    return {
      success: false,
      details: 'Saldo insuficiente para realizar a transação!'
    }
  }

  const quantity = await verifyQuantity(params.assetid, body.quantity)
  if (!quantity) {
    return {
      success: false,
      details: 'Quantidade indisponível no momento!'
    }
  }

  const infoTransaction = await sequelize.transaction()

  try {
    const transactionDB = await transaction.create(
      {
        total_quantity: body.quantity,
        sub_total: body.subtotal_price,
        total_price: body.total_price,
        user_id: params.clientid
      },
      { transaction: infoTransaction }
    )

    const transactionDetailsDB = await transaction_details.create(
      {
        quantity: body.quantity,
        purchase_price: body.current_price,
        financial_asset_id: params.assetid,
        transaction_id: transactionDB.cod_transaction
      },
      { transaction: infoTransaction }
    )

    const financialResult = await financial_asset_catalog.findByPk(
      params.assetid
    )
    financialResult.quantity -= Number(body.quantity)
    await financialResult.save({ transaction: infoTransaction })

    const accountDB = await account.findOne({
      where: { user_id: params.clientid }
    })
    accountDB.balance -= Number(body.total_price)
    await accountDB.save({ transaction: infoTransaction })

    await infoTransaction.commit()
    return {
      success: true,
      message: 'Transação realizada com sucesso!',
      data: transactionMapper.toDTO(transactionDB, transactionDetailsDB)
    }
  } catch (error) {
    await infoTransaction.rollback()
    throw new ErrorGeneric('Erro ao realizar a transação!')
  }
}

const createDepositService = async (clientid, body) => {
  const infoTransaction = await sequelize.transaction()
  try {
    const transactionDB = await transaction.create(
      {
        sub_total: body.value,
        total_price: body.value,
        user_id: clientid
      },
      { transaction: infoTransaction }
    )

    const transferDB = await transfer.create(
      {
        origin_cpf: body.origin_cpf,
        deposit_value: body.value,
        transaction_id: transactionDB.cod_transaction,
        bank_id: body.bank_id
      },
      { transaction: infoTransaction }
    )

    const accountDB = await account.findOne(
      { where: { user_id: clientid } },
      { transaction: infoTransaction }
    )

    await account.update(
      {
        balance: Number(accountDB.balance) + Number(body.value)
      },
      { where: { user_id: clientid } },
      { transaction: infoTransaction }
    )

    await infoTransaction.commit()
    return {
      success: true,
      message: 'Transação cadastrada com sucesso!',
      data: transactionMapper.toDTODeposit(transferDB)
    }
  } catch (error) {
    await infoTransaction.rollback()
    throw new ErrorGeneric('Erro ao realizar o depósito!')
  }
}

const listAllUserTransactionService = async () => {
  try {
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
      message: 'Transações listadas com sucesso!',
      data: userDB.map((item) => transactionMapper.toDTOUserIdAssets(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! Código: ${err.name}`)
  }
}

const listByIdUserTransactionService = async (id) => {
  try {
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
      message: 'Transações listadas com sucesso!',
      data: userDB.map((item) => transactionMapper.toDTOUserIdAssets(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! Código: ${err.name}`)
  }
}

const listByIdUserDepositService = async (id) => {
  try {
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
      message: 'Depósito(s) listado(s) com sucesso!',
      data: userDB.map((item) => transactionMapper.toDTOListDeposit(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! Código: ${err.name}`)
  }
}

module.exports = {
  createTransactionService,
  createDepositService,
  listByIdUserDepositService,
  listAllUserTransactionService,
  listByIdUserTransactionService
}
