const { bank } = require('../models/models.index')
const bankMapper = require('../mappers/mappers.bank')

const listAllBanksService = async () => {
  const bankDB = await bank.findAll({})

  return {
    success: true,
    message: 'Bancos listados com sucesso!',
     data: bankDB.map((item) => {
       return bankMapper.toDTO(item)
    })
  }
}
module.exports = {
  listAllBanksService
}
