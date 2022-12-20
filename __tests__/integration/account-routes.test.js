const request = require('supertest')
const app = require('../../api/app')
const { sequelize } = require('../../api/models/models.index')
const { createCredentialService } = require('../../api/services/services.user')

describe('Account Routes', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Route /v1/account', () => {
    test('Make sure /v1/account return 200 on account search', async () => {
      const cpf = '413.423.614-41'
      const result = await createCredentialService(cpf)
      await request(app).get('/v1/account').set(result).expect(200)
    })
    test('Make sure /v1/account return 401 if user is not authenticated', async () => {
      await request(app).get('/v1/account').expect(401)
    })
    test('Make sure /v1/account return 403 if user is not authorized', async () => {
      const cpf = '233.113.223-35'
      const result = await createCredentialService(cpf)
      await request(app).get('/v1/account').set(result).expect(403)
    })
  })

  describe('Route /v1/account/:id', () => {
    test('Make sure /v1/account/:id return 200 on account id search', async () => {
      const cpf = '413.423.614-41'
      const codAccount = 1
      const result = await createCredentialService(cpf)
      await request(app)
        .get(`/v1/account/${codAccount}`)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/account/:id return 401 if user is not authenticated', async () => {
      const codAccount = 1
      await request(app).get(`/v1/account/${codAccount}`).expect(401)
    })
    test('Make sure /v1/account/:id return 403 if user is not authorized', async () => {
      const cpf = '233.113.223-35'
      const codAccount = 3
      const result = await createCredentialService(cpf)
      await request(app)
        .get(`/v1/account/${codAccount}`)
        .set(result)
        .expect(403)
    })
    test('Make sure /v1/account/:id return 422 if the id does not exist', async () => {
      const cpf = '413.423.614-41'
      const codAccount = 0
      const result = await createCredentialService(cpf)
      await request(app)
        .get(`/v1/account/${codAccount}`)
        .set(result)
        .expect(422)
    })
  }) 

  describe('Route /v1/account/client/:id', () => {
    test('Make sure /v1/account/client/:id return 200 on account id search', async () => {
      const cpf = '233.113.223-35'
      const codClient = 3
      const result = await createCredentialService(cpf)
      await request(app)
        .get(`/v1/account/client/${codClient}`)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/account/client/:id return 401 if user is not authenticated', async () => {
      const codAccount = 1
      await request(app).get(`/v1/account/client/${codAccount}`).expect(401)
    })
    test('Make sure /v1/account/:id return 422 if the id does not exist', async () => {
      const cpf = '233.113.223-35'
      const codClient = 0
      const result = await createCredentialService(cpf)
      await request(app)
        .get(`/v1/account/client/${codClient}`)
        .set(result)
        .expect(422)
    })
  })
})
