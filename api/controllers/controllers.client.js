const clientService = require('../services/services.client')

const listAllClientsController = async (req, res) => {
  const resultService = await clientService.listAllClientsService()
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listAllClientsController
}
