const request = require('supertest')
const app = require('../../api/app')
const { sequelize } = require('../../api/models/models.index')
const { createCredentialService } = require('../../api/services/services.user')

describe('Financial Routes', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Route GET /v1/financial', () => {
    test('Make sure /v1/financial return 200 on financial search', async () => {
      await request(app).get('/v1/financial').expect(200)
    })
  })
  
  describe('Route GET /v1/financial/:financialid', () => {
    test('Make sure /v1/financial/:financialid return 200 on financial id search', async () => {
      const cpf = '413.423.614-41'
      const financialid = 1
      const result = await createCredentialService(cpf)
      await request(app)
        .get(`/v1/financial/${financialid}`)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/financial/:financialid return 401 if user is not authenticated', async () => {
      const financialid = 1
      await request(app).get(`/v1/financial/${financialid}`).expect(401)
    })
    test('Make sure /v1/financial/:financialid returns 422 if the financialid is not valid', async () => {
      const cpf = '413.423.614-41'
      const financialid = 0
      const result = await createCredentialService(cpf)
      await request(app)
        .get(`/v1/financial/${financialid}`)
        .set(result)
        .expect(422)
    })
  })
})
