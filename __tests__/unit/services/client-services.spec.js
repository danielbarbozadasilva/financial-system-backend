const services = require('../../../api/services/services.client')
const { sequelize } = require('../../../api/models/models.index')

describe('Client services', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Client services', () => {
    test('Make sure listAllClientsService returns 200 on success', async () => {
      const result = await services.listAllClientsService()
      expect(result.success).toBe(true)
    })
    test('Make sure listByIdClientService returns 200 on success', async () => {
      const id = 1
      const result = await services.listByIdClientService(id)
      expect(result.success).toBe(true)
    })
    test('Make sure changeStatusService returns 200 on success', async () => {
      const clientid = 3
      const status = false
      const result = await services.changeStatusService(clientid, status)
      expect(result.success).toBe(true)
    })
    test('Make sure updateClientService returns 200 on success', async () => {
      const clientid = 3
      const body = {
        address: 'Rua abc, 123',
        uf: 'RJ',
        city: 'RIO DE JANEIRO',
        zip_code: '23412-200',
        complement: 'CASA',
        cod_address: 1,
        name: 'Daniel Barboza',
        email: 'daniel@gmail.com',
        cpf: '123.123.123-90',
        gender: 'M',
        kind: 'client',
        birth_date: '09/09/2000',
        password: 'daniel',
        phone: '(21) 99878-9981'
      }
      const result = await services.updateClientService(clientid, body)
      expect(result.success).toBe(true)
    })
    test('Make sure listAllClientsService returns 500 if server error', async () => {
      await sequelize.close()
      try {
        await services.listAllClientsService()
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })
    test('Make sure listByIdClientService returns 500 if server error', async () => {
      await sequelize.close()
      try {
        const id = 1
        await services.listByIdClientService(id)
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })
    test('Make sure changeStatusService returns 500 if server error', async () => {
      await sequelize.close()
      try {
        const clientid = 3
        const status = false
        await services.changeStatusService(clientid, status)
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })
    test('Make sure updateClientService returns 500 if server error', async () => {
      await sequelize.close()
      try {
        const clientid = 3
        const body = {
          address: 'Rua abc, 123',
          uf: 'RJ',
          city: 'RIO DE JANEIRO',
          zip_code: '23412-200',
          complement: 'CASA',
          cod_address: 1,
          name: 'Daniel Barboza',
          email: 'daniel@gmail.com',
          cpf: '123.123.123-90',
          gender: 'M',
          kind: 'client',
          birth_date: '09/09/2000',
          password: 'daniel',
          phone: '(21) 99878-9981'
        }
        await services.updateClientService(clientid, body)
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })
  })
})