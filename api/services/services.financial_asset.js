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


module.exports = {
  listFinancialAssetsService
}
