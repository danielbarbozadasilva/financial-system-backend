const accountService = require('../services/services.account')

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
  checkBalanceController
}
