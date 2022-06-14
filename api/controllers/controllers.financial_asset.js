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

const listByIdFinancialAssetsController = async (req, res) => {
  const { financialid } = req.params
  const resultService = await financialService.listByIdFinancialAssetsService(financialid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const createFinancialAssetsController = async (req, res) => {
  const { body } = req
  const resultService = await financialService.createFinancialAssetsService(body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateFinancialAssetsController = async (req, res) => {
  const { body } = req
  const { financialid } = req.params
  const resultService = await financialService.updateFinancialAssetsService(
    body, financialid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const deleteFinancialAssetsController = async (req, res) => {
  const { financialid } = req.params
  const resultService = await financialService.deleteFinancialAssetsService(financialid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listAllFinancialAssetsController,
  listByIdFinancialAssetsController,
  createFinancialAssetsController,
  updateFinancialAssetsController,
  deleteFinancialAssetsController
}
