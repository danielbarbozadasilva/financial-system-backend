const { financial_asset_catalog } = require('../models/models.index')
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

const createFinancialAssetsService = async (body) => {
  fileUtils.UtilMove(body.image.old_path, body.image.new_path)
  const financialDB = await financial_asset_catalog.create({
    name: body.name,
    description: body.description,
    bvmf: body.bvmf,
    current_price: body.current_price,
    cpf: body.cpf,
    quantity: body.quantity,
    image: {
      origin: body.image.origin,
      name: body.image.newName,
      type: body.image.type
    }
  })

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

module.exports = {
  listFinancialAssetsService,
  createFinancialAssetsService
}
