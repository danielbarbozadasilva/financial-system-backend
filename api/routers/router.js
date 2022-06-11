const { Router } = require('express')
const { name, version } = require('../../package.json')

const routersV1User = require('./v1/routers.user')
const routersV1Financial = require('./v1/routers.financial_asset')

module.exports = (app) => {
  app.get('/', (req, res, next) => {
    res.send({ name, version })
  })

  const routesV1 = Router()
  routersV1User(routesV1)
  routersV1Financial(routesV1)

  app.use('/v1', routesV1)
}