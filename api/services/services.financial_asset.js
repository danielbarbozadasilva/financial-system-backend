const { QueryTypes } = require('sequelize')
const { financial_asset_catalog, sequelize } = require('../models/models.index')
const financialAssetMapper = require('../mappers/mappers.financial_asset')
const fileUtils = require('../utils/utils.file')

const ErrorBusinessRule = require('../utils/errors/errors.business_rule')
const ErrorGeneric = require('../utils/errors/erros.generic_error')

const listFinancialAssetsService = async () => {
  try {
    const financialDB = await financial_asset_catalog.findAll({})
    return {
      success: true,
      message: 'Ativos listados com sucesso!',
      data: financialDB.map((item) => financialAssetMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! Código: ${err.name}`)
  }
}

const listByIdFinancialAssetsService = async (id) => {
  try {
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
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! Código: ${err.name}`)
  }
}

const createFinancialAssetsService = async (body) => {
  try {
    const moveFile = fileUtils.UtilMove(
      body.image.old_path,
      body.image.new_path
    )

    if (moveFile !== undefined) {
      return {
        success: false,
        message: 'A operação não pode ser realizada',
        details: ['Não foi possivel mover a imagem']
      }
    }

    const financialDB = await financial_asset_catalog.create({
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
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! Código: ${err.name}`)
  }
}

const updateFinancialAssetsService = async (body, id) => {
  try {
    const financialDB = await financial_asset_catalog.findOne({
      where: { cod_fin_asset: id }
    })

    if (!financialDB) {
      throw new ErrorBusinessRule('Não existe um ativo com esse Id!')
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
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! Código: ${err.name}`)
  }
}

const deleteFinancialAssetsService = async (id) => {
  try {
    const result = await financial_asset_catalog.findOne({
      where: { cod_fin_asset: id }
    })

    if (!result) {
      throw new ErrorBusinessRule('Não existe um ativo com esse Id!')
    }

    const financialDB = await financial_asset_catalog.destroy({
      where: { cod_fin_asset: id }
    })

    if (!financialDB) {
      return {
        success: false,
        details: ['Erro ao excluir o ativo']
      }
    }

    fileUtils.UtilRemove('financial', result.image.name)

    return {
      success: true,
      message: 'Excluido com sucesso!'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! Código: ${err.name}`)
  }
}

const listTop05FinancialAssetsService = async () => {
  try {
    const financialDB = await sequelize.query(
      'SELECT f.name, f.cod_fin_asset, f.name, f.description, f.bvmf, f.current_price, f.quantity, f.image, td.financial_asset_id, COUNT(*) as qtd FROM transaction_details td INNER JOIN financial_asset_catalog f ON f.cod_fin_asset=td.financial_asset_id INNER JOIN transaction t ON t.cod_transaction = td.transaction_id GROUP BY f.cod_fin_asset ORDER BY qtd DESC LIMIT 5;',
      { type: QueryTypes.SELECT }
    )
    return {
      success: true,
      message: 'Top 05 listado com sucesso!',
      data: financialDB.map((item) => financialAssetMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! Código: ${err.name}`)
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
