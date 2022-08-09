const {
  account,
  user,
  financial_asset_catalog
} = require('../../models/models.index')
const ErrorUnprocessableEntity = require('../errors/errors.unprocessable_entity')

const verifyIdAccountDbMiddleware = async (req, res, next) => {
  const accountDB = await account.findByPk(req.params.accountid)
  if (!accountDB) {
    throw new ErrorUnprocessableEntity(`Não existe uma conta com esse id!`)
  }
  next()
}

const verifyIdClientDbMiddleware = async (req, res, next) => {
  const clientDB = await user.findByPk(req.params.clientid)
  if (!clientDB) {
    throw new ErrorUnprocessableEntity(`Não existe um cliente com esse id!`)
  }
  next()
}

const verifyIdFinancialDbMiddleware = async (req, res, next) => {
  const financialDB = await financial_asset_catalog.findByPk(
    req.params.financialid
  )
  if (!financialDB) {
    throw new ErrorUnprocessableEntity(`Não existe um ativo com esse id!`)
  }
  next()
}

module.exports = {
  verifyIdAccountDbMiddleware,
  verifyIdClientDbMiddleware,
  verifyIdFinancialDbMiddleware
}
