const services = require('../../../api/services/services.account')
const { sequelize } = require('../../../api/models/models.index')

describe('Account services', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Account services', () => {
    test('Make sure listAllAccountService returns 200 on success', async () => {
      const result = await services.listAllAccountService()
      expect(result.success).toBe(true)
    })
    test('Make sure listByIdAccountService returns 200 on success', async () => {
      const id = 1
      const result = await services.listByIdAccountService(id)
      expect(result.success).toBe(true)
    })
    test('Make sure checkBalanceService returns 200 on success', async () => {
      const id = 2
      const result = await services.checkBalanceService(id)
      expect(result.success).toBe(true)
    })
    test('Make sure listAllAccountService returns 500 if server error', async () => {
      await sequelize.close()
      try {
        await services.listAllAccountService()
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })
    test('Make sure listByIdAccountService returns 500 if server error', async () => {
      await sequelize.close()
      try {
        const id = 1
        await services.listByIdAccountService(id)
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })
    test('Make sure checkBalanceService returns 500 if server error', async () => {
      await sequelize.close()
      try {
        const id = 2
        await services.checkBalanceService(id)
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })
  })
})
