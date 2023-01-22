const services = require('../../../api/services/services.account')
const { sequelize } = require('../../../api/models/models.index')

describe('Account services', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Account services', () => {
    test('Make sure listAllAccountService return success', async () => {
      const result = await services.listAllAccountService()
      expect(result.success).toBe(true)
    })
    test('Make sure listAllAccountService has the id property', async () => {
      const result = await services.listAllAccountService()
      expect(result.data[0]).toHaveProperty('id')
    })
    test('Make sure listByIdAccountService return success', async () => {
      const id = 1
      const result = await services.listByIdAccountService(id)
      expect(result.success).toBe(true)
    })
    test('Make sure checkBalanceService return success', async () => {
      const id = 2
      const result = await services.checkBalanceService(id)
      expect(result.success).toBe(true)
    })
  })
})
