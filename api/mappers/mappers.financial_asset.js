const fileUtils = require('../utils/utils.file')

const toDTO = (model) => {
  return {
    name: model.name,
    description: model.description,
    bvmf: model.bvmf,
    current_price: parseFloat(model.current_price).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    quantity: model.quantity,
    image: fileUtils.UtilCreateAddressDownload('financial', model.image.name)
  }
}

module.exports = {
  toDTO
}
