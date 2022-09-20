const { Op } = require('sequelize')
const {
  transaction,
  transactiondetails,
  account,
  user,
  assets,
  transfer,
  bank,
  sequelize
} = require('../models/models.index')
const transactionMapper = require('../mappers/mappers.transaction')
const ErrorGeneric = require('../utils/errors/erros.generic-error')
const ErrorBusinessRule = require('../utils/errors/errors.business-rule')

const verifyQuantity = async (assetid, quantity) => {
  const result = await assets.findByPk(assetid)
  const checkQuantity = result.quantity >= quantity
  if (!checkQuantity) {
    throw new ErrorBusinessRule('Quantidade indisponível no momento!')
  }
}

const verifyBalance = async (id, totalPrice) => {
  const result = await account.findOne({
    where: { user_id: id }
  })

  const checkBalance = Number(result.balance) >= totalPrice
  if (!checkBalance) {
    throw new ErrorBusinessRule('Saldo insuficiente para realizar a transação!')
  }
}

const updateQuantity = async (assetid, quantity) => {
  const result = await assets.findByPk(assetid)
  result.quantity -= quantity
  await result.save()
}

const updateBalance = async (id, totalPrice) => {
  const result = await account.findOne({
    where: { user_id: id }
  })
  result.balance -= totalPrice
  await result.save()
}

const createTransactionService = async (params, body) => {
  await verifyQuantity(params.financialid, body.quantity)
  await verifyBalance(params.clientid, body.total_price)

  await updateQuantity(params.financialid, body.quantity)
  await updateBalance(params.clientid, body.total_price)

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

    const transactionDetailsDB = await transactiondetails.create(
      {
        quantity: body.quantity,
        purchase_price: body.current_price,
        financial_asset_id: params.financialid,
        transaction_id: transactionDB.cod_transaction
      },
      { transaction: infoTransaction }
    )

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
        sub_total: body.total,
        total_price: body.total,
        user_id: clientid
      },
      { transaction: infoTransaction }
    )

    const transferDB = await transfer.create(
      {
        origin_cpf: body.origin_cpf,
        deposit_value: body.total,
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
        balance: Number(accountDB.balance) + body.total
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
          model: transactiondetails,
          as: 'transactiondetails',
          where: {
            cod_trans_details: { [Op.ne]: null }
          },
          include: {
            model: assets,
            as: 'assets'
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
    throw new ErrorGeneric('Erro ao realizar a operação!')
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
          model: transactiondetails,
          as: 'transactiondetails',
          where: {
            cod_trans_details: { [Op.ne]: null }
          },
          include: {
            model: assets,
            as: 'assets'
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
    throw new ErrorGeneric('Erro ao realizar a operação!')
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
    throw new ErrorGeneric('Erro ao realizar a operação!')
  }
}

module.exports = {
  createTransactionService,
  createDepositService,
  listByIdUserDepositService,
  listAllUserTransactionService,
  listByIdUserTransactionService
}
