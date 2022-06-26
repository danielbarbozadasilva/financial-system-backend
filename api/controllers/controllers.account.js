const accountService = require('../services/services.account')

const listAllAccountController = async (req, res) => {
  const resultService = await accountService.listAllAccountService()
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listByIdAccountController = async (req, res) => {
  const { accountid } = req.params
  const resultService = await accountService.listByIdAccountService(accountid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const checkBalanceController = async (req, res) => {
  const { clientid } = req.params
  const resultService = await accountService.checkBalanceService(clientid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listAllAccountController,
  listByIdAccountController,
  checkBalanceController
}
