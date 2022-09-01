const { account, user, branch, transaction } = require('../models/models.index')
const accountMapper = require('../mappers/mappers.account')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listAllAccountService = async () => {
  try {
    const accountDB = await account.findAll({
      include: [
        {
          model: user,
          as: 'user',
          required: true
        },
        {
          model: branch,
          as: 'branch'
        }
      ]
    })
    return {
      success: true,
      message: 'Informações bancárias listadas com sucesso!',
      data: accountDB.map((item) => accountMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric('Erro ao realizar a operação!')
  }
}

const listByIdAccountService = async (accountid) => {
  try {
    const accountDB = await account.findOne({
      include: [
        {
          model: user,
          as: 'user',
          required: true
        },
        {
          model: branch,
          as: 'branch'
        }
      ],
      where: { cod_account: accountid }
    })
    return {
      success: true,
      message: 'Informações bancárias listadas com sucesso!',
      data: accountMapper.toDTO(accountDB)
    }
  } catch (err) {
    throw new ErrorGeneric('Erro ao realizar a operação!')
  }
}

const checkBalanceService = async (id) => {
  try {
    const accountDB = await account.findOne({
      include: [
        {
          model: user,
          as: 'user',
          required: true,
          where: { cod_user: id }
        },
        {
          model: branch,
          as: 'branch'
        }
      ]
    })

    const transactionDB = await transaction.findAll({
      include: [
        {
          model: user,
          as: 'user'
        }
      ],
      where: { user_id: id }
    })

    return {
      success: true,
      message: 'Saldo listado com sucesso!',
      data: accountMapper.toDTOUserAssets(accountDB, transactionDB)
    }
  } catch (err) {
    throw new ErrorGeneric('Erro ao realizar a operação!')
  }
}

module.exports = {
  listAllAccountService,
  listByIdAccountService,
  checkBalanceService
}
