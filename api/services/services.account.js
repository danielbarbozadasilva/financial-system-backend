const { account, user, bank, transaction } = require('../models/models.index')
const accountMapper = require('../mappers/mappers.account')

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
        model: bank,
        as: 'bank'
      }
    ]
  })

  const transactionDB = await transaction.findAll({
    include: [
      {
        model: user,
        as: 'user',
      }
    ],
    where: { user_id: id }
  })

  return {
    success: true,
    message: 'Saldo listado com sucesso!',
    data: accountMapper.toDTOUserAssets(accountDB, transactionDB)
  }
}

module.exports = {
  checkBalanceService
}
