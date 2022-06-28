const { QueryTypes } = require('sequelize')
const { financial_asset_catalog, sequelize } = require('../models/models.index')
const financialAssetMapper = require('../mappers/mappers.financial_asset')
const fileUtils = require('../utils/utils.file')

const ErrorBusinessRule = require('../utils/errors/errors.business_rule')

const listFinancialAssetsService = async () => {
  const financialDB = await financial_asset_catalog.findAll({})

  return {
    success: true,
    message: 'Ativos listados com sucesso!',
    data: financialDB.map((item) => {
      return financialAssetMapper.toDTO(item)
    })
  }
}

const listByIdFinancialAssetsService = async (id) => {
  const financialDB = await financial_asset_catalog.findByPk(id)
  if (!financialDB) {
    throw new ErrorBusinessRule('Não existe um ativo com esse Id')
  } else {
    return {
      success: true,
      message: 'Ativo listado com sucesso!',
      data: financialAssetMapper.toDTO(financialDB)
    }
  }
}

const createFinancialAssetsService = async (body) => {
  const [moveFile, financialDB] = await Promise.all([
    fileUtils.UtilMove(body.image.old_path, body.image.new_path),
    financial_asset_catalog.create({
      name: body.name,
      description: body.description,
      bvmf: body.bvmf,
      current_price: body.current_price,
      quantity: body.quantity,
      image: {
        origin: body.image.origin,
        name: body.image.newName,
        type: body.image.type
      }
    })
  ])
  if (moveFile !== undefined) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['It is not possible to move the product']
    }
  }
  if (!financialDB) {
    return {
      success: false,
      details: ['Erro ao cadastrar o ativo']
    }
  }
  return {
    success: true,
    message: 'Ativo cadastrado com sucesso!',
    data: financialAssetMapper.toDTO(financialDB)
  }
}

const updateFinancialAssetsService = async (body, id) => {
  const financialDB = await financial_asset_catalog.findOne({
    where: { cod_fin_asset: id }
  })

  if (!financialDB) {
    throw new ErrorBusinessRule('Não existe um ativo com esse Id')
  }

  financialDB.name = body.name
  financialDB.description = body.description
  financialDB.bvmf = body.bvmf
  financialDB.current_price = body.current_price
  financialDB.cpf = body.cpf
  financialDB.quantity = body.quantity

  if (typeof body.image === 'object') {
    financialDB.image = {
      origin: body.image.origin,
      name: body.image.newName,
      type: body.image.type
    }

    fileUtils.UtilRemove('financial', financialDB.image.name)
    fileUtils.UtilMove(body.image.old_path, body.image.new_path)
  }
  const resultDB = await financialDB.save()

  if (!resultDB) {
    return {
      success: false,
      details: ['Erro ao atualizar o ativo']
    }
  }
  return {
    success: true,
    message: 'Ativo atualizado com sucesso!',
    data: financialAssetMapper.toDTO(financialDB)
  }
}

const deleteFinancialAssetsService = async (id) => {
  const financialDB = await financial_asset_catalog.destroy({
    where: { cod_fin_asset: id }
  })

  if (!financialDB) {
    return {
      success: false,
      details: ['Erro ao excluir o ativo']
    }
  }
  return {
    success: true,
    message: 'Excluido com sucesso!'
  }
}

const listTop05FinancialAssetsService = async () => {
  const financialDB = await sequelize.query(
    'SELECT f.cod_fin_asset, f.name, f.description, f.bvmf, f.current_price, f.quantity, f.image, t.financial_asset_id, COUNT(*) FROM transaction_details t inner join financial_asset_catalog f on t.financial_asset_id = f.cod_fin_asset group by financial_asset_id order by COUNT(financial_asset_id) DESC',
    { type: QueryTypes.SELECT }
  )
  return {
    success: true,
    message: 'Top 05 listado com sucesso!',
    data: financialDB.map((item) => {
      return financialAssetMapper.toDTO(item)
    })
  }
}

module.exports = {
  listFinancialAssetsService,
  listByIdFinancialAssetsService,
  createFinancialAssetsService,
  updateFinancialAssetsService,
  deleteFinancialAssetsService,
  listTop05FinancialAssetsService
}
