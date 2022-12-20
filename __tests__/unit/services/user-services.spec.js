const services = require('../../../api/services/services.user')
const { sequelize } = require('../../../api/models/models.index')

describe('User services', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('User Services', () => {
    test('Make sure authService return success if the access credentials are valid', async () => {
      const cpf = '413.423.614-41'
      const password = 'daniel'
      const result = await services.authService(cpf, password)
      expect(result.success).toBe(true)
    })

    test('Make sure authService return 401 if login credentials are not valid', async () => {
      try {
        const cpf = '333.123.123.90'
        const password = 'jose'
        await services.authService(cpf, password)
      } catch (error) {
        expect(error.statusCode).toBe(401)
      }
    })

    test('Make sure registerService return success', async () => {
      const data = {
        name: 'exemplo',
        email: 'exemplo@gmail.com',
        cpf: '123.333.333-35',
        gender: 'M',
        birth_date: '1999/09/02',
        password: 'exemplo',
        phone: '(21) 2345-0987',
        address: 'Rua exemplo',
        uf: 'RJ',
        city: 'RIO DE JANEIRO',
        zip_code: '24356-200',
        complement: 'casa'
      }
      const result = await services.registerService(data)
      expect(result.success).toBe(true)
    })

    test('Make sure userIsValidService return the result if cpf and password are valid', async () => {
      const cpf = '413.423.614-41'
      const password = 'daniel'
      const result = await services.userIsValidService(cpf, password)
      expect(result).toBe(true)
    })

    test('Make sure userIsValidService return 401 if cpf and password are invalid', async () => {
      try {
        const cpf = '333.123.123.90'
        const password = 'jose'
        await services.userIsValidService(cpf, password)
      } catch (error) {
        expect(error.statusCode).toBe(401)
      }
    })

    test('Make sure userIsActiveService return the result if user is activated', async () => {
      const cpf = '233.113.223-35'
      const result = await services.userIsActiveService(cpf)
      expect(result).toBe(true)
    })

    test('Make sure userIsActiveService return 403 if user is not activated', async () => {
      try {
        const cpf = '111.222.123.90'
        await services.userIsActiveService(cpf)
      } catch (error) {
        expect(error.statusCode).toBe(403)
      }
    })

    test('Make sure checkPermissionService return the result if the user has permission', async () => {
      const type = '1'
      const permission = 'CREATE_FINANCIAL'
      const result = services.checkPermissionService(type, permission)
      expect(result).toBe(true)
    })

    test('Make sure checkPermissionService return 403 if the user does not have permission', async () => {
      try {
        const type = '2'
        const permission = 'CREATE_FINANCIAL'
        services.checkPermissionService(type, permission)
      } catch (error) {
        expect(error.statusCode).toBe(403)
      }
    })

    test('Make sure createCredentialService return the result if the user credentials are correct', async () => {
      const cpf = '413.423.614-41'
      const result = await services.createCredentialService(cpf)
      expect(result).not.toBe(false)
    })

    test('Make sure createCredentialService return 403 if the user cpf is invalid', async () => {
      try {
        const cpf = '333.123.123.90'
        await services.createCredentialService(cpf)
      } catch (error) {
        expect(error.statusCode).toBe(403)
      }
    })
  })
})
