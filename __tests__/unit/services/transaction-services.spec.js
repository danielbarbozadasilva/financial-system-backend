const services = require('../../../api/services/services.transaction')
const { sequelize } = require('../../../api/models/models.index')

describe('Client services', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Account services', () => {
    test('Make sure verifyQuantity returns 200 on success', async () => {
      const assetid = 2
      const quantity = 1
      const result = await services.verifyQuantity(assetid, quantity)
      expect(result).toBe(true)
    })
    test('Make sure verifyQuantity returns 400 if the quantity is exceeded', async () => {
      try {
        const assetid = 2
        const quantity = 300
        await services.verifyQuantity(assetid, quantity)
      } catch (error) {
        expect(error.statusCode).toBe(400)
      }
    })
  })
})
