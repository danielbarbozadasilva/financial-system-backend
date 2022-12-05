const services = require('../../../api/services/services.financial_asset')
const { sequelize } = require('../../../api/models/models.index')

describe('Financial asset services', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Financial asset services', () => {
    test('Make sure listFinancialAssetsService returns 200 on success', async () => {
      const result = await services.listFinancialAssetsService()
      expect(result.success).toBe(true)
    })
  })
})
