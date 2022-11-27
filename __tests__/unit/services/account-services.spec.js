const services = require('../../../api/services/services.account')
const { sequelize } = require('../../../api/models/models.index')

describe('Account services', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Account services', () => {
    test('Ensure listAllAccountService returns 200 on success', async () => {
      const result = await services.listAllAccountService()
      expect(result.success).toBe(true)
    })
    test('Make sure listByIdAccountService returns 200 if ID parameter exists', async () => {
      const id = 1
      const result = await services.listByIdAccountService(id)
      expect(result.success).toBe(true)
    })
    test('Ensure listAllAccountService returns 500 if server error', async () => {
      await sequelize.close()
      try {
        await services.listAllAccountService()
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })
  })
})
