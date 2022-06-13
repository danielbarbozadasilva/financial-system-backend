const toDTO = (model) => {
  return {
    id: model.user.cod_user,
    name: model.user.name,
    email: model.user.email,
    cpf: model.user.cpf,
    gender: model.user.gender,
    birth_date: model.user.birth_date,
    password: model.user.password,
    phone: model.user.phone,
    kind: model.user.kind,
    status: model.user.status,
    address: model.user.address.address,
    uf: model.user.address.uf,
    city: model.user.address.city,
    zip_code: model.user.address.zip_code,
    complement: model.user.address.complement,
    cod_transaction: model.cod_transaction,
    total_quantity: model.total_quantity,
    total_price: parseFloat(model.total_price).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  }
}

module.exports = {
  toDTO
}
