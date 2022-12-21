const request = require('supertest')
const app = require('../../api/app')
const { sequelize } = require('../../api/models/models.index')
const { createCredentialService } = require('../../api/services/services.user')

describe('Transaction Routes', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Route /v1/transaction/client', () => {
    test('Make sure /v1/transaction/client return 200 on transaction search', async () => {
      const cpf = '413.423.614-41'
      const result = await createCredentialService(cpf)
      await request(app).get('/v1/transaction/client').set(result).expect(200)
    })
    test('Make sure /v1/transaction/client return 401 if user is not authenticated', async () => {
      await request(app).get('/v1/transaction/client').expect(401)
    })
    test('Make sure /v1/transaction/client return 403 if user is not authorized', async () => {
      const cpf = '233.113.223-35'
      const result = await createCredentialService(cpf)
      await request(app).get('/v1/transaction/client').set(result).expect(403)
    })
  })

  describe('Route /v1/transaction/client/:clientid', () => {
    test('Make sure /v1/transaction/client return 200 on transaction search', async () => {
      const cpf = '413.423.614-41'
      const clientid = 2
      const result = await createCredentialService(cpf)
      await request(app)
        .get(`/v1/transaction/client/${clientid}`)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/transaction/client/:clientid return 401 if user is not authenticated', async () => {
      const clientid = 2
      await request(app).get(`/v1/transaction/client/${clientid}`).expect(401)
    })
    test('Make sure /v1/transaction/client/:clientid return 422 if client id is not valid', async () => {
      const cpf = '413.423.614-41'
      const clientid = 0
      const result = await createCredentialService(cpf)
      await request(app)
        .get(`/v1/transaction/client/${clientid}`)
        .set(result)
        .expect(422)
    })
  })

  describe('Route /v1/transaction/deposit/client/:clientid', () => {
    test('Make sure /v1/transaction/deposit/client/:clientid return 200 on transaction search', async () => {
      const cpf = '413.423.614-41'
      const clientid = 2
      const result = await createCredentialService(cpf)
      await request(app)
        .get(`/v1/transaction/deposit/client/${clientid}`)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/transaction/deposit/client/:clientid return 401 if user is not authenticated', async () => {
      const clientid = 2
      await request(app)
        .get(`/v1/transaction/deposit/client/${clientid}`)
        .expect(401)
    })
    test('Make sure /v1/transaction/deposit/client/:clientid return 403 if user is not authorized', async () => {
      const cpf = '233.113.223-35'
      const clientid = 2
      const result = await createCredentialService(cpf)
      await request(app)
        .get(`/v1/transaction/deposit/client/${clientid}`)
        .set(result)
        .expect(403)
    })
    test('Make sure /v1/transaction/deposit/client/:clientid return 422 if client id is not valid', async () => {
      const cpf = '413.423.614-41'
      const clientid = 0
      const result = await createCredentialService(cpf)
      await request(app)
        .get(`/v1/transaction/client/${clientid}`)
        .set(result)
        .expect(422)
    })
  })
})
