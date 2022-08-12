const { bank } = require('../models/models.index')
const bankMapper = require('../mappers/mappers.bank')
const ErrorGeneric = require('../utils/errors/erros.generic_error')

const listAllBanksService = async () => {
  try {
    const bankDB = await bank.findAll({})

    return {
      success: true,
      message: 'Bancos listados com sucesso!',
      data: bankDB.map((item) => bankMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric('Operação realizada com sucesso!')
  }
}
module.exports = {
  listAllBanksService
}
