const services = require('../../../api/services/services.client')
const { sequelize } = require('../../../api/models/models.index')

describe('Client services', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Client services', () => {
    test('Make sure listAllClientsService return success', async () => {
      const result = await services.listAllClientsService()
      expect(result.success).toBe(true)
    })
    test('Make sure listAllClientsService has the id property', async () => {
      const result = await services.listAllClientsService()
      expect(result.data[0]).toHaveProperty('id')
    })
    test('Make sure listByIdClientService return success', async () => {
      const id = 1
      const result = await services.listByIdClientService(id)
      expect(result.success).toBe(true)
    })
    test('Make sure changeStatusService return success', async () => {
      const clientid = 3
      const status = false
      const result = await services.changeStatusService(clientid, status)
      expect(result.success).toBe(true)
    })
    test('Make sure updateClientService return success', async () => {
      const clientid = 2
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
  })
})
