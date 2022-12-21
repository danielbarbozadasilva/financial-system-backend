const request = require('supertest')
const app = require('../../api/app')
const { sequelize } = require('../../api/models/models.index')

describe('Financial Routes', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Route /v1/financial', () => {
    test('Make sure /v1/financial return 200 on assets search', async () => {
      await request(app).get('/v1/financial').expect(200)
    })
  })
})
