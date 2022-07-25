const toDTO = (model) => {
  const date = new Date()
  return {
    id: model.cod_user,
    name: model.user_name,
    email: model.email,
    cpf: model.cpf,
    gender: model.gender,
    birth_date: date.toLocaleDateString(model.birth_date),
    password: model.password,
    phone: model.phone,
    kind: model.kind,
    status: model.status === 1 ? 'Ativo' : 'Desativado',
    address: [
      {
        id: model.cod_address,
        address: model.address,
        uf: model.uf,
        city: model.city,
        zip_code: model.zip_code,
        complement: model.complement
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
    transaction_details: [
      {
        id: model?.cod_fin_asset,
        name: model?.name,
        description: model?.description,
        bvmf: model?.bvmf,
        current_price: parseFloat(
          model.current_price
        ).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        }),
        quantity: model?.quantity
      }
    ]
  }
}

const toDTOList = (clientDB) => {
  return {
    id: clientDB?.cod_user,
    name: clientDB?.name,
    email: clientDB?.email,
    cpf: clientDB?.cpf,
    gender: clientDB?.gender,
    birth_date: clientDB?.birth_date,
    password: clientDB?.password,
    phone: clientDB?.phone,
    status: clientDB?.status,
    address: clientDB?.address?.address,
    uf: clientDB?.address?.uf,
    city: clientDB?.address?.city,
    zip_code: clientDB?.address?.zip_code,
    complement: clientDB?.address?.complement
  }
}

module.exports = {
  toDTO,
  toDTOList
}
