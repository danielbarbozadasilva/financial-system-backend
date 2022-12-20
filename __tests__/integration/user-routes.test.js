const request = require('supertest')
const app = require('../../api/app')
const { sequelize } = require('../../api/models/models.index')

describe('Auth Routes', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Route /v1/register', () => {
    test('Make sure /v1/register return 200 on register', async () => {
      await request(app)
        .post('/v1/register')
        .send({
          name: 'Daniel',
          email: 'danielsilva@gmail.com',
          cpf: '333.121.121.90',
          gender: 'M',
          birth_date: '1990/09/08',
          password: 'daniel',
          phone: '(21)2321-2345',
          address: 'Rua abc, 123',
          uf: 'RJ',
          city: 'Rio de janeiro',
          zip_code: '23454-234',
          complement: 'casa'
        })
        .expect(200)
    })

    test('Make sure /v1/register return 400 if the email already exists', async () => {
      await request(app)
        .post('/v1/register')
        .send({
          name: 'Daniel',
          email: 'danielsilva@gmail.com',
          cpf: '123.432.121.90',
          gender: 'M',
          birth_date: '1990/09/08',
          password: 'daniel',
          phone: '(21)2321-2345',
          address: 'Rua abc, 123',
          uf: 'RJ',
          city: 'Rio de janeiro',
          zip_code: '23454-234',
          complement: 'casa'
        })
        .expect(400)
    })

    test('Make sure /v1/register return 400 if the cpf already exists', async () => {
      await request(app)
        .post('/v1/register')
        .send({
          name: 'Daniel',
          email: 'danielbarboza.silva@gmail.com',
          cpf: '333.121.121.90',
          gender: 'M',
          birth_date: '1990/09/08',
          password: 'daniel',
          phone: '(21)2321-2345',
          address: 'Rua abc, 123',
          uf: 'RJ',
          city: 'Rio de janeiro',
          zip_code: '23454-234',
          complement: 'casa'
        })
        .expect(400)
    })
  })
  
  describe('Route /v1/login', () => {
    test('Make sure /v1/login return 200 if the credentials are valid', async () => {
      await request(app)
        .post('/v1/auth')
        .send({
          cpf: '233.113.223-35',
          password: 'tatiana'
        })
        .expect(200)
    })

    test('Make sure /v1/login return 401 if the credentials are not valid', async () => {
      await request(app)
        .post('/v1/auth')
        .send({
          cpf: '113.123.614-41',
          password: '123'
        })
        .expect(401)
    })
  })
})
