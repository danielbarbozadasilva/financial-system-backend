const toDTO = (model) => {
  return {
    cod_bank: model.cod_bank,
    name: model.name,
    branch: model.branch
  }
}
module.exports = {
  toDTO
}
