const toUserDTO = (model) => {
  const { _id, email, name, kind } = model
  return {
    id: _id,
    email,
    name: name,
    type: kind === 'administrator' ? 1 : 2
  }
}

const toUserRegister = (userDB, addressDB) => {
  return {
    id: userDB.cod_user,
    name: userDB.name,
    email: userDB.email,
    cpf: userDB.cpf,
    gender: userDB.gender,
    birth_date: userDB.birth_date,
    password: userDB.password,
    phone: userDB.phone,
    kind: userDB.kind,
    status: userDB.status,
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
