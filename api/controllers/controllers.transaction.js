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

const createDepositController = async (req, res) => {
  const { body } = req
  const { clientid } = req.params
  const resultService = await transactionService.createDepositService(
    clientid,
    body
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listAllUserTransactionController = async (req, res) => {
  const resultService = await transactionService.listAllUserTransactionService()
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listByIdUserTransactionController = async (req, res) => {
  const { clientid } = req.params
  const resultService = await transactionService.listByIdUserTransactionService(
    clientid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listByIdUserDepositController = async (req, res) => {
  const { clientid } = req.params
  const resultService = await transactionService.listByIdUserDepositService(
    clientid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  createTransactionController,
  createDepositController,
  listByIdUserDepositController,
  listAllUserTransactionController,
  listByIdUserTransactionController
}
