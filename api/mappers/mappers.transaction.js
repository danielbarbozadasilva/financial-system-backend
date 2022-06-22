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

const toDTOAllUserAssets = (model) => {
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
    model?.transaction_details?.current_date?.toLocaleTimeString('pt-BR'),
    cod_user: model.user.cod_user,
    name_user: model.user.name,
    cpf: model.user.cpf
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
  toDTOAllUserAssets,
  toDTOUserIdAssets
}
