const financialService = require('../services/services.financial_asset')

const listAllFinancialAssetsController = async (req, res) => {
  const resultService = await financialService.listFinancialAssetsService()
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listAllFinancialAssetsController
}
