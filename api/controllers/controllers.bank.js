const bankService = require('../services/services.bank')

const listAllBanksController = async (req, res) => {
  const resultService = await bankService.listAllBanksService()
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listAllBanksController
}
