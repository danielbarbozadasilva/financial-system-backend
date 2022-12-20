const request = require('supertest')
const app = require('../../api/app')
const { sequelize } = require('../../api/models/models.index')
const { createCredentialService } = require('../../api/services/services.user')

describe('Client Routes', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Route /v1/client', () => {
    test('Make sure /v1/client return 200 on client search', async () => {
      const cpf = '413.423.614-41'
      const result = await createCredentialService(cpf)
      await request(app).get('/v1/client').set(result).expect(200)
    })
    test('Make sure /v1/client return 401 if user is not authenticated', async () => {
      await request(app).get('/v1/client').expect(401)
    })
    test('Make sure /v1/client return 403 if user is not authorized', async () => {
      const cpf = '233.113.223-35'
      const result = await createCredentialService(cpf)
      await request(app).get('/v1/client').set(result).expect(403)
    })
  })
})
