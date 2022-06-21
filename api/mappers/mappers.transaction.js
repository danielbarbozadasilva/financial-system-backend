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

module.exports = {
  toDTO
}
