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

const listByIdClientController = async (req, res) => {
  const { clientid } = req.params
  const resultService = await clientService.listByIdClientService(clientid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateClientController = async (req, res) => {
  const { body } = req
  const { clientid } = req.params
  const resultService = await clientService.updateClientService(clientid, body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const changeStatusClientController = async (req, res) => {
  const { clientid, status } = req.params
  const resultService = await clientService.changeStatusService(
    clientid,
    status
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listAllClientsController,
  listByIdClientController,
  updateClientController,
  changeStatusClientController
}
