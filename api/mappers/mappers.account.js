const toDTO = (accountDB) => {
  const date = new Date()

  return {
    id: accountDB.cod_account,
    number: accountDB.number,
    type: accountDB.type,
    balance: parseFloat(accountDB.balance).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    open_date:
      date.toLocaleDateString(accountDB.open_date) +
      ' ' +
      accountDB?.open_date?.toLocaleTimeString('pt-BR'),
    id_user: accountDB.user.cod_user,
    name: accountDB.user.name,
    email: accountDB.user.email,
    cpf: accountDB.user.cpf,
    gender: accountDB.user.gender,
    birth_date:
      date.toLocaleDateString(accountDB?.user?.birth_date) +
      ' ' +
      accountDB?.user?.birth_date?.toLocaleTimeString('pt-BR'),
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
    name_branch: accountDB.branch.name
  }
}

const toDTOUserAssets = (accountDB, transactionDB) => {
  var element = 0

  const date = new Date()

  transactionDB.map((item) => {
    element += Number(item.total_price)
  })

  return {
    id: accountDB.cod_account,
    type: accountDB.type,
    balance: parseFloat(accountDB.balance).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    open_date:
      date.toLocaleDateString(accountDB.open_date) +
      ' ' +
      accountDB?.open_date?.toLocaleTimeString('pt-BR'),
    total_assets: parseFloat(element).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    consolidated: (Number(accountDB.balance) + element).toLocaleString(
      'pt-br',
      {
        style: 'currency',
        currency: 'BRL'
      }
    ),
    user_id: accountDB.user_id,
    branch_id: accountDB.branch_id,
    user: {
      id: accountDB.user.cod_user,
      name: accountDB.user.name,
      email: accountDB.user.email,
      cpf: accountDB.user.cpf,
      gender: accountDB.user.gender,
      birth_date:
        date.toLocaleDateString(accountDB?.user?.birth_date) +
        ' ' +
        accountDB?.user?.birth_date?.toLocaleTimeString('pt-BR'),
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
      name: accountDB.branch.name
    }
  }
}

module.exports = {
  toDTO,
  toDTOUserAssets
}
