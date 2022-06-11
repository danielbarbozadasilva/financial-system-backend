const { Router } = require('express')
const { name, version } = require('../../package.json')

module.exports = (app) => {
  app.get('/', (req, res, next) => {
    res.send({ name, version })
  })

  const routesV1 = Router()

  app.use('/v1', routesV1)
}
