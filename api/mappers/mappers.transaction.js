const toDTO = (transactionDB, transactionDetailsDB) => ({
  subtotal_price: parseFloat(transactionDB.sub_total)?.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }),
  total_price: parseFloat(transactionDB.total_price)?.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }),
  quantity: transactionDetailsDB.quantity,
  current_price: parseFloat(
    transactionDetailsDB.purchase_price
  )?.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })
})

const toDTODeposit = (model) => ({
  id: model.cod_transfer,
  origin_cpf: model.origin_cpf,
  deposit_value: model.deposit_value,
  transaction_id: model.transaction_id,
  bank_id: model.bank_id
})

const toDTOListDeposit = (model) => {
  const date = new Date()

  return {
    id: model.cod_transfer,
    deposit_value: parseFloat(model.deposit_value)?.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    origin_cpf: model.origin_cpf,
    current_date: `${date?.toLocaleDateString(
      model?.current_date
    )} ${model?.current_date?.toLocaleTimeString('pt-BR')}`,
    transaction_id: model.transaction_id,
    bank_id: model.bank_id,
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
    user_id: model.transaction.user_id,
    cod_bank: model.bank.cod_bank,
    bank_name: model.bank.name
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
    id_asset: model?.transactiondetails?.assets?.cod_fin_asset,
    name: model?.transactiondetails?.assets?.name,
    description: model?.transactiondetails?.assets?.description,
    bvmf: model?.transactiondetails?.assets?.bvmf,
    current_price: parseFloat(
      model?.transactiondetails?.assets?.current_price
    )?.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    purchase_price: parseFloat(
      model?.transactiondetails?.purchase_price
    )?.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    current_date: `${date?.toLocaleDateString(
      model?.transactiondetails?.current_date
    )} ${model?.transactiondetails?.current_date?.toLocaleTimeString('pt-BR')}`
  }
}

module.exports = {
  toDTO,
  toDTODeposit,
  toDTOUserIdAssets,
  toDTOListDeposit
}
