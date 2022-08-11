const { Op } = require('sequelize')
const { account, user, assets } = require('../../models/models.index')
const ErrorUnprocessableEntity = require('../errors/errors.unprocessable_entity')
const ErrorBusinessRule = require('../errors/errors.business_rule')

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
  const financialDB = await assets.findByPk(req.params.financialid)
  if (!financialDB) {
    throw new ErrorUnprocessableEntity(`Não existe um ativo com esse id!`)
  }
  next()
}

const verifyEmailExists = async (req, res, next) => {
  const resultEmail = await user.findOne({
    where: {
      email: req.body.email
    }
  })
  if (resultEmail !== null) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }
  next()
}

const verifyCpfExists = async (req, res, next) => {
  const resulCpf = await user.findOne({
    where: {
      cpf: req.body.cpf
    }
  })
  if (resulCpf !== null) {
    throw new ErrorBusinessRule('Este cpf já está em uso!')
  }
  next()
}

const verifyEmailBodyExist = async (req, res, next) => {
  const resultEmail = await user.findOne({
    where: {
      email: req.body.email,
      cod_user: { [Op.notIn]: [req.params.id] }
    }
  })
  if (resultEmail !== null) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }
  next()
}

const verifyCpfBodyExist = async (req, res, next) => {
  const resultCpf = await user.findOne({
    where: {
      cpf: req.body.cpf,
      cod_user: { [Op.notIn]: [req.params.id] }
    }
  })
  if (resultCpf !== null) {
    throw new ErrorBusinessRule('Este cpf já está em uso!')
  }
  next()
}

module.exports = {
  verifyIdAccountDbMiddleware,
  verifyIdClientDbMiddleware,
  verifyIdFinancialDbMiddleware,
  verifyEmailExists,
  verifyCpfExists,
  verifyEmailBodyExist,
  verifyCpfBodyExist
}
