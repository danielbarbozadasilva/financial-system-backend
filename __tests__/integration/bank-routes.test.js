const request = require('supertest')
const app = require('../../api/app')
const { sequelize } = require('../../api/models/models.index')
const { createCredentialService } = require('../../api/services/services.user')

describe('Bank Routes', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Route /v1/bank', () => {
    test('Make sure /v1/bank return 200 on bank search', async () => {
      const cpf = '413.423.614-41'
      const result = await createCredentialService(cpf)
      await request(app).get('/v1/bank').set(result).expect(200)
    })
    test('Make sure /v1/bank return 401 if user is not authenticated', async () => {
      await request(app).get('/v1/bank').expect(401)
    })
  })
})
