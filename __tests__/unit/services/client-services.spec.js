const services = require('../../../api/services/services.client')
const { sequelize } = require('../../../api/models/models.index')

describe('Client services', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Account services', () => {
    test('Make sure listAllClientsService returns 200 on success', async () => {
      const result = await services.listAllClientsService()
      expect(result.success).toBe(true)
    })
    test('Make sure listByIdClientService returns 200 on success', async () => {
      const id = 1
      const result = await services.listByIdClientService(id)
      expect(result.success).toBe(true)
    })
    test('Make sure listAllClientsService returns 500 if server error', async () => {
      await sequelize.close()
      try {
        await services.listAllClientsService()
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })
    test('Make sure listByIdClientService returns 500 if server error', async () => {
      await sequelize.close()
      try {
        await services.listByIdClientService()
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })
  })
})
