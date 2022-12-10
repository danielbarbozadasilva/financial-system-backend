const services = require('../../../api/services/services.bank')
const { sequelize } = require('../../../api/models/models.index')

describe('Bank services', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Bank services', () => {
    test('Make sure listAllBanksService returns 200 on success', async () => {
      const result = await services.listAllBanksService()
      expect(result.success).toBe(true)
    })
  })
})
