const { account, user, bank } = require('../models/models.index')
const accountMapper = require('../mappers/mappers.account')

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
    data: accountMapper.toDTOUserAssets(userDB)
  }
}

module.exports = {
  checkBalanceService
}
