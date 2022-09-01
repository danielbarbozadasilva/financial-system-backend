const userService = require('../services/services.user')

const authController = async (req, res) => {
  const { cpf, password } = req.body
  const resultService = await userService.authService(cpf, password)
  const code = resultService.success ? 200 : 401
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const registerController = async (req, res) => {
  const { body } = req
  const resultService = await userService.registerService(body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  authController,
  registerController
}
