const services = require('../../../api/services/services.bank')
const { sequelize } = require('../../../api/models/models.index')

describe('Bank services', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Bank services', () => {
    test('Make sure listAllBanksService return success', async () => {
      const result = await services.listAllBanksService()
      expect(result.success).toBe(true)
    })
    test('Make sure listAllBanksService has the cod_bank property', async () => {
      const result = await services.listAllBanksService()
      expect(result.data[0]).toHaveProperty('cod_bank')
    })
  })
})
