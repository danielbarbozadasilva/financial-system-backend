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

const toDTOUserAssets = (model) => {
  return {
    id: model.cod_user,
    name: model.name,
    email: model.email,
    cpf: model.cpf,
    transaction: model.map((item) => {
      return {
        id: item.cod_transaction,
        total_quantity: item.total_quantity,
        total_price: parseFloat(item.total_price).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        }),
        id_asset:
          item.transaction_details.financial_asset_catalog?.cod_fin_asset,
        name: item.transaction_details.financial_asset_catalog?.name,
        description:
          item.transaction_details.financial_asset_catalog?.description,
        bvmf: item.transaction_details.financial_asset_catalog?.bvmf,
        current_price: parseFloat(
          item.transaction_details.financial_asset_catalog?.current_price
        ).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        }),
        purchase_price: parseFloat(
          item.transaction_details.purchase_price
        ).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    })
  }
}
module.exports = {
  toDTO,
  toDTOUserAssets
}
