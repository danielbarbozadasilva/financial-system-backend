const toUserDTO = (model) => {

  return {
    id: model?.user?.cod_user,
    email: model?.user?.email,
    name: model?.user?.name,
    cpf: model?.user?.cpf,
    type: model?.user?.kind === 'administrator' ? 1 : 2,
    number: model?.number
  }
}

const toUserRegister = (clientDB, addressDB) => {
  return {
    id: clientDB.cod_user,
    name: clientDB.name,
    email: clientDB.email,
    cpf: clientDB.cpf,
    gender: clientDB.gender,
    birth_date: clientDB.birth_date,
    password: clientDB.password,
    phone: clientDB.phone,
    kind: clientDB.kind,
    status: clientDB.status,
    address: addressDB.address,
    uf: addressDB.uf,
    city: addressDB.city,
    zip_code: addressDB.zip_code,
    complement: addressDB.complement
  }
}

module.exports = {
  toUserDTO,
  toUserRegister
}
