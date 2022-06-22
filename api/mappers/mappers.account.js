const toDTOUserAssets = (model) => {
  const date = new Date()

  return {
    id: model.cod_account,
    type: model.type,
    balance: model.balance,
    open_date:
      date.toLocaleDateString(model.user.birth_date) +
      ' ' +
      date.toLocaleTimeString('pt-BR'),
    user_id: model.user_id,
    bank_id: model.bank_id,
    user: {
      id: model.user.cod_user,
      name: model.user.name,
      email: model.user.email,
      cpf: model.user.cpf,
      gender: model.user.gender,
      birth_date: model.user.birth_date,
      password: model.user.password,
      phone: model.user.phone,
      status: model.user.status,
      kind: model.user.kind,
      created_at:
        date.toLocaleDateString(model.user.created_at) +
        ' ' +
        date.toLocaleTimeString('pt-BR'),
      updated_at:
        date.toLocaleDateString(model.user.updated_at) +
        ' ' +
        date.toLocaleTimeString('pt-BR'),
      address_id: model.user.address_id
    },
    bank: {
      id: model.bank.cod_bank,
      name: model.bank.name,
      branch: model.bank.branch
    }
  }
}

module.exports = {
  toDTOUserAssets
}
