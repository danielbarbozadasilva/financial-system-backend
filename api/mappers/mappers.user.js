const toUserDTO = (model) => {
  const { _id, email, name, kind } = model
  return {
    id: _id,
    email,
    name: name,
    type: kind === 'administrator' ? 1 : 2
  }
}

module.exports = {
  toUserDTO
}
