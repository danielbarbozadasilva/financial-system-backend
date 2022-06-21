const transactionService = require('../services/services.transaction')

const createTransactionController = async (req, res) => {
  const { body } = req
  const { params } = req

  const resultService = await transactionService.createTransactionService(
    params,
    body
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  createTransactionController
}
