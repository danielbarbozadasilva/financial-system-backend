const services = require('../../../api/services/services.account')
const { sequelize } = require('../../../api/models/models.index')

describe('Account services', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Account services', () => {
    test('Should call listAllAccountService with correct values', async () => {
      const result = await services.listAllAccountService()
      expect(result.success).toBe(true)
    })
   
  })
})
