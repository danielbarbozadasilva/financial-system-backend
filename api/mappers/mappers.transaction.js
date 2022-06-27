const toDTO = (transactionDB, transactionDetailsDB) => {
  return {
    total_quantity: transactionDB.total_quantity,
    sub_total: transactionDB.sub_total,
    total_price: transactionDB.total_price,
    user_id: transactionDB.user_id,
    quantity: transactionDetailsDB.quantity,
    purchase_price: transactionDetailsDB.purchase_price,
    financial_asset_id: transactionDetailsDB.financial_asset_id,
    transaction_id: transactionDetailsDB.transaction_id
  }
}

const toDTOListDeposit = (model) => {
  const date = new Date()

  return {
    cod_transfer: model.cod_transfer,
    deposit_value: parseFloat(model.deposit_value)?.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    origin_cpf: model.origin_cpf,
    current_date:
      date?.toLocaleDateString(model?.current_date) +
      ' ' +
      model?.current_date?.toLocaleTimeString('pt-BR'),
    transaction_id: model.transaction_id,
    bank_id: model.bank_id,
    transaction: {
      cod_transaction: model.transaction.cod_transfer,
      total_quantity: model.transaction.total_quantity,
      sub_total: parseFloat(model.transaction.sub_total)?.toLocaleString(
        'pt-br',
        {
          style: 'currency',
          currency: 'BRL'
        }
      ),
      total_price: parseFloat(model.transaction.total_price)?.toLocaleString(
        'pt-br',
        {
          style: 'currency',
          currency: 'BRL'
        }
      ),
      user_id: model.transaction.user_id
    },
    bank: {
      cod_bank: model.bank.cod_bank,
      name: model.bank.name,
      branch: model.bank.branch
    }
  }
}

const toDTOUserIdAssets = (model) => {
  const date = new Date()

  return {
    id: model?.cod_transaction,
    total_quantity: model?.total_quantity,
    total_price: parseFloat(model?.total_price)?.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    id_asset:
      model?.transaction_details?.financial_asset_catalog?.cod_fin_asset,
    name: model?.transaction_details?.financial_asset_catalog?.name,
    description:
      model?.transaction_details?.financial_asset_catalog?.description,
    bvmf: model?.transaction_details?.financial_asset_catalog?.bvmf,
    current_price: parseFloat(
      model?.transaction_details?.financial_asset_catalog?.current_price
    )?.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    purchase_price: parseFloat(
      model?.transaction_details?.purchase_price
    )?.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    current_date:
      date?.toLocaleDateString(model?.transaction_details?.current_date) +
      ' ' +
      model?.transaction_details?.current_date?.toLocaleTimeString('pt-BR')
  }
}

module.exports = {
  toDTO,
  toDTOUserIdAssets,
  toDTOListDeposit
}
