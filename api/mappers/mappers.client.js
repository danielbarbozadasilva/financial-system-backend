const toDTO = (model) => {
  const date = new Date()
  return {
    id: model.user.cod_user,
    name: model.user.name,
    email: model.user.email,
    cpf: model.user.cpf,
    gender: model.user.gender,
    birth_date: date.toLocaleDateString(model.user.birth_date),
    password: model.user.password,
    phone: model.user.phone,
    kind: model.user.kind,
    status: model.user.status === true ? 'Ativo' : 'Desativado',
    address: [
      {
        id: model.user.address.cod_address,
        address: model.user.address.address,
        uf: model.user.address.uf,
        city: model.user.address.city,
        zip_code: model.user.address.zip_code,
        complement: model.user.address.complement
      }
    ],
    transaction: [
      {
        id: model.cod_transaction,
        total_quantity: model.total_quantity,
        total_price: parseFloat(model.total_price).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    ],
    transaction_details: model.transaction_details.map((item) => {
      return {
        id: item.financial_asset_catalog?.cod_fin_asset,
        name: item.financial_asset_catalog?.name,
        description: item.financial_asset_catalog?.description,
        bvmf: item.financial_asset_catalog?.bvmf,
        current_price: parseFloat(
          item.financial_asset_catalog.current_price
        ).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        }),
        quantity: item.financial_asset_catalog?.quantity
      }
    })
  }
}

const toDTOList = (clientDB) => {
  return {
    id: clientDB.cod_user,
    name: clientDB.name,
    email: clientDB.email,
    cpf: clientDB.cpf,
    gender: clientDB.gender,
    birth_date: clientDB.birth_date,
    password: clientDB.password,
    phone: clientDB.phone,
    status: clientDB.status,
    address: clientDB.address.address,
    uf: clientDB.address.uf,
    city: clientDB.address.city,
    zip_code: clientDB.address.zip_code,
    complement: clientDB.address.complement
  }
}

module.exports = {
  toDTO,
  toDTOList
}
