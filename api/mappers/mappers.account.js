const toDTOUserAssets = (accountDB, transactionDB) => {
  var arm = 0
  var element = 0

  const date = new Date()

  var total_assets = transactionDB.map((item) => {
    arm += Number(item.total_price)
    return arm
  })

  for (let i = 0; i < total_assets.length; i++) {
    element += total_assets[i]
  }

  return {
    id: accountDB.cod_account,
    type: accountDB.type,
    balance: parseFloat(accountDB.balance).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    open_date:
      date.toLocaleDateString(accountDB.user.birth_date) +
      ' ' +
      accountDB?.user.birth_date?.toLocaleTimeString('pt-BR'),
    total_assets: parseFloat(element).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    consolidated: (Number(accountDB.balance) + element).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    user_id: accountDB.user_id,
    branch_id: accountDB.branch_id,
    user: {
      id: accountDB.user.cod_user,
      name: accountDB.user.name,
      email: accountDB.user.email,
      cpf: accountDB.user.cpf,
      gender: accountDB.user.gender,
      birth_date: accountDB.user.birth_date,
      password: accountDB.user.password,
      phone: accountDB.user.phone,
      status: accountDB.user.status,
      kind: accountDB.user.kind,
      created_at:
        date.toLocaleDateString(accountDB.user.created_at) +
        ' ' +
        accountDB?.user?.created_at?.toLocaleTimeString('pt-BR'),
      updated_at:
        date.toLocaleDateString(accountDB.user.updated_at) +
        ' ' +
        accountDB?.user?.updated_at?.toLocaleTimeString('pt-BR'),
      address_id: accountDB.user.address_id
    },
    branch: {
      id: accountDB.branch.cod_branch,
      name: accountDB.branch.name,
      bank: accountDB.branch.bank
    }
  }
}

module.exports = {
  toDTOUserAssets
}
