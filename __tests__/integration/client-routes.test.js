const request = require('supertest')
const app = require('../../api/app')
const { sequelize } = require('../../api/models/models.index')
const { createCredentialService } = require('../../api/services/services.user')

describe('Client Routes', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Route GET /v1/client', () => {
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

  describe('Route GET /v1/client/:clientid', () => {
    test('Make sure /v1/client/:clientid return 200 on client id search', async () => {
      const cpf = '413.423.614-41'
      const clientid = 1
      const result = await createCredentialService(cpf)
      await request(app).get(`/v1/client/${clientid}`).set(result).expect(200)
    })
    test('Make sure /v1/client/:clientid return 401 if user is not authenticated', async () => {
      const clientid = 1
      await request(app).get(`/v1/client/${clientid}`).expect(401)
    })
    test('Make sure /v1/client/:clientid returns 422 if the clientid is not valid', async () => {
      const cpf = '413.423.614-41'
      const clientid = 0
      const result = await createCredentialService(cpf)
      await request(app).get(`/v1/client/${clientid}`).set(result).expect(422)
    })
  })

  describe('Route PUT /v1/client/:clientid', () => {
    test('Make sure /v1/client/:clientid return 200 on update', async () => {
      const cpf = '413.423.614-41'
      const clientid = 3
      const result = await createCredentialService(cpf)
      await request(app)
        .put(`/v1/client/${clientid}`)
        .send({
          name: 'Tatiana',
          email: 'tatiana@gmail.com',
          cpf: '233.113.223-35',
          gender: 'M',
          birth_date: '1990/09/08',
          password: 'tatiana',
          phone: '(21)2321-2345',
          cod_address: 3,
          address: 'Rua abc, 123',
          uf: 'RJ',
          city: 'Rio de janeiro',
          zip_code: '23454-234',
          complement: 'casa'
        })
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/client/:clientid returns 400 if the email already exists', async () => {
      const cpf = '413.423.614-41'
      const clientid = 3
      const result = await createCredentialService(cpf)
      await request(app)
        .put(`/v1/client/${clientid}`)
        .send({
          name: 'Tatiana',
          email: 'guilherme@gmail.com',
          cpf: '233.113.223-35',
          gender: 'M',
          birth_date: '1990/09/08',
          password: 'tatiana',
          phone: '(21)2321-2345',
          cod_address: 3,
          address: 'Rua abc, 123',
          uf: 'RJ',
          city: 'Rio de janeiro',
          zip_code: '23454-234',
          complement: 'casa'
        })
        .set(result)
        .expect(400)
    })
    test('Make sure /v1/client/:clientid returns 400 if the cpf already exists', async () => {
      const cpf = '413.423.614-41'
      const clientid = 3
      const result = await createCredentialService(cpf)
      await request(app)
        .put(`/v1/client/${clientid}`)
        .send({
          name: 'Tatiana',
          email: 'tatiana@gmail.com',
          cpf: '123.123.123-45',
          gender: 'M',
          birth_date: '1990/09/08',
          password: 'tatiana',
          phone: '(21)2321-2345',
          cod_address: 3,
          address: 'Rua abc, 123',
          uf: 'RJ',
          city: 'Rio de janeiro',
          zip_code: '23454-234',
          complement: 'casa'
        })
        .set(result)
        .expect(400)
    })
    test('Make sure /v1/client/:clientid returns 401 if the user is not authenticated', async () => {
      const clientid = 3
      await request(app)
        .put(`/v1/client/${clientid}`)
        .send({
          name: 'Tatiana',
          email: 'tatiana@gmail.com',
          cpf: '233.113.223-35',
          gender: 'M',
          birth_date: '1990/09/08',
          password: 'tatiana',
          phone: '(21)2321-2345',
          cod_address: 3,
          address: 'Rua abc, 123',
          uf: 'RJ',
          city: 'Rio de janeiro',
          zip_code: '23454-234',
          complement: 'casa'
        })
        .expect(401)
    })
    test('Make sure /v1/client/:clientid returns 422 if the clientid is not valid', async () => {
      const cpf = '413.423.614-41'
      const clientid = 0
      const result = await createCredentialService(cpf)
      await request(app)
        .put(`/v1/client/${clientid}`)
        .send({
          name: 'Tatiana',
          email: 'tatiana@gmail.com',
          cpf: '233.113.223-35',
          gender: 'M',
          birth_date: '1990/09/08',
          password: 'tatiana',
          phone: '(21)2321-2345',
          cod_address: 3,
          address: 'Rua abc, 123',
          uf: 'RJ',
          city: 'Rio de janeiro',
          zip_code: '23454-234',
          complement: 'casa'
        })
        .set(result)
        .expect(422)
    })
  })
  describe('Route PUT /v1/client/:clientid/status/:status', () => {
    test('Make sure /v1/client/:clientid/status/:status returns 200 if the user is successfully deactivated', async () => {
      const cpf = '413.423.614-41'
      const clientid = 3
      const status = 0
      const result = await createCredentialService(cpf)
      await request(app)
        .put(`/v1/client/${clientid}/status/${status}`)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/client/:clientid/status/:status returns 200 if the user is successfully activated', async () => {
      const cpf = '413.423.614-41'
      const clientid = 3
      const status = 1
      const result = await createCredentialService(cpf)
      await request(app)
        .put(`/v1/client/${clientid}/status/${status}`)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/client/:clientid/status/:status returns 422 if the clientid is not valid', async () => {
      const cpf = '413.423.614-41'
      const clientid = 0
      const status = 1
      const result = await createCredentialService(cpf)
      await request(app)
        .put(`/v1/client/${clientid}/status/${status}`)
        .set(result)
        .expect(422)
    })
  })
})
