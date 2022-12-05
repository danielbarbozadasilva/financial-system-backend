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

    test('Make sure listByIdFinancialAssetsService returns 200 on success', async () => {
      const id = 1
      const result = await services.listByIdFinancialAssetsService(id)
      expect(result.success).toBe(true)
    })

    test('Make sure listFinancialAssetsService returns 500 if a server error occurs', async () => {
      try {
        await sequelize.close()
        await services.listFinancialAssetsService()
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })

    test('Make sure listByIdFinancialAssetsService returns 500 if a server error occurs', async () => {
      try {
        await sequelize.close()
        const id = 1
        await services.listByIdFinancialAssetsService(id)
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })
  })
})
