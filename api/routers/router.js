const { Router } = require('express')
const { name, version } = require('../../package.json')
const { formatError } = require('../utils/errors/errors.handler')

const routersV1User = require('./v1/routers.user')
const routersV1Financial = require('./v1/routers.financial_asset')
const routersV1Client = require('./v1/routers.client')
const routersV1Transaction = require('./v1/routers.transaction')
const routersV1Account = require('./v1/routers.account')
const routersV1Bank = require('./v1/routers.bank')

module.exports = (app) => {
  app.get('/', (req, res, next) => {
    res.send({ name, version })
  })

  const routesV1 = Router()
  routersV1User(routesV1)
  routersV1Financial(routesV1)
  routersV1Client(routesV1)
  routersV1Transaction(routesV1)
  routersV1Account(routesV1)
  routersV1Bank(routesV1)

  app.use('/v1', routesV1)

  app.use((err, req, res, next) => {
    formatError(err, res)
  })
}
