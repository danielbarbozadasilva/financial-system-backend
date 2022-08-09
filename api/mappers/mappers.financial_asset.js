const fileUtils = require('../utils/utils.file')

const toDTO = (model) => ({
  id: model.cod_fin_asset,
  name: model.name,
  description: model.description,
  bvmf: model.bvmf,
  current_price: parseFloat(model.current_price).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }),
  quantity: model.quantity,
  image: fileUtils.utilCreateAddressDownload('financial', model.image.name),
  count: model?.qtd
})

module.exports = {
  toDTO
}
