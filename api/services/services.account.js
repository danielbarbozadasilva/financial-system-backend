const { account, user, branch, transaction } = require('../models/models.index')
const accountMapper = require('../mappers/mappers.account')

const listAllAccountService = async () => {
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
    data: accountDB.map((item) => {
      return accountMapper.toDTO(item)
    })
  }
}

const listByIdAccountService = async (accountid) => {
  const accountDB = await account.findOne({
    include: [
      {
        model: user,
        as: 'user',
        required: true,
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
}

const checkBalanceService = async (id) => {
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
    where: { user_id: id, type: 'ASSET' }
  })

  return {
    success: true,
    message: 'Saldo listado com sucesso!',
    data: accountMapper.toDTOUserAssets(accountDB, transactionDB)
  }
}

module.exports = {
  listAllAccountService,
  listByIdAccountService,
  checkBalanceService
}
