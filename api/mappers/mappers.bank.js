const toDTO = (model) => ({
  cod_bank: model.cod_bank,
  name: model.name
})
module.exports = {
  toDTO
}
