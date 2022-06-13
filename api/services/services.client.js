const {
  user,
  address,
  transaction
} = require('../models/models.index')
const clientMapper = require('../mappers/mappers.client')

const listAllClientsService = async () => {
  const userDB = await transaction.findAll({
    include: [
      {
        model: user,
        as: 'user',
        right: true,
        where: { kind: 'client' },
        include: {
          model: address,
          as: 'address',
          required: true
        }
      }
    ],
    order: [['user_id', 'ASC']]
  })

  return {
    success: true,
    message: 'Clientes listados com sucesso!',
    data: userDB.map((item) => {
      return clientMapper.toDTO(item)
    })
  }
}

module.exports = {
  listAllClientsService
}
