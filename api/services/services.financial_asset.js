const { QueryTypes } = require('sequelize')
const { assets, sequelize } = require('../models/models.index')
const financialAssetMapper = require('../mappers/mappers.financial_asset')
const fileUtils = require('../utils/utils.file')
const ErrorGeneric = require('../exceptions/erros.generic-error')

const listFinancialAssetsService = async () => {
  try {
    const financialDB = await assets.findAll({})
    return {
      success: true,
      message: 'Ativos listados com sucesso!',
      data: financialDB.map((item) => financialAssetMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric('Erro ao listar os ativos!')
  }
}

const listByIdFinancialAssetsService = async (id) => {
  try {
    const financialDB = await assets.findByPk(id)
    return {
      success: true,
      message: 'Ativo listado com sucesso!',
      data: financialAssetMapper.toDTO(financialDB)
    }
  } catch (err) {
    throw new ErrorGeneric('Erro ao listar o ativo!')
  }
}

const createFinancialAssetsService = async (body) => {
  fileUtils.utilMove(body.image.old_path, body.image.new_path)

  try {
    const financialDB = await assets.create({
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

    return {
      success: true,
      message: 'Ativo cadastrado com sucesso!',
      data: financialAssetMapper.toDTO(financialDB)
    }
  } catch (err) {
    throw new ErrorGeneric('Erro ao cadastrar o ativo!')
  }
}

const updateFinancialAssetsService = async (body, id) => {
  try {
    const financialDB = await assets.findOne({
      where: { cod_fin_asset: id }
    })

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

      fileUtils.utilRemove('financial', financialDB.image.name)
      fileUtils.utilMove(body.image.old_path, body.image.new_path)
    }

    await financialDB.save()

    return {
      success: true,
      message: 'Ativo atualizado com sucesso!',
      data: financialAssetMapper.toDTO(financialDB)
    }
  } catch (err) {
    throw new ErrorGeneric('Erro ao atualizar o ativo!')
  }
}

const deleteFinancialAssetsService = async (id) => {
  try {
    const result = await assets.findOne({
      where: { cod_fin_asset: id }
    })

    fileUtils.utilRemove('financial', result.image.name)

    await assets.destroy({
      where: { cod_fin_asset: id }
    })

    return {
      success: true,
      message: 'Ativo excluido com sucesso!'
    }
  } catch (err) {
    throw new ErrorGeneric('Erro ao excluir o ativo!')
  }
}

const listTop05FinancialAssetsService = async () => {
  try {
    const financialDB = await sequelize.query(
      'SELECT f.name, f.cod_fin_asset, f.name, f.description, f.bvmf, f.current_price, f.quantity, f.image, td.financial_asset_id, COUNT(*) as qtd FROM transactiondetails td INNER JOIN assets f ON f.cod_fin_asset=td.financial_asset_id INNER JOIN transaction t ON t.cod_transaction = td.transaction_id GROUP BY f.cod_fin_asset ORDER BY qtd DESC LIMIT 5;',
      { type: QueryTypes.SELECT }
    )
    return {
      success: true,
      message: 'Top 05 listado com sucesso!',
      data: financialDB.map((item) => financialAssetMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric('Erro ao listar os ativos!')
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
