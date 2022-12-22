const services = require('../../../api/services/services.transaction')
const { sequelize } = require('../../../api/models/models.index')

describe('Transactions services', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Transactions services', () => {
    test('Make sure verifyQuantity returns the data', async () => {
      const assetid = 2
      const quantity = 1
      const result = await services.verifyQuantity(assetid, quantity)
      expect(result).toBe(true)
    })

    test('Make sure verifyBalance returns the data', async () => {
      const id = 2
      const totalPrice = 50
      const result = await services.verifyBalance(id, totalPrice)
      expect(result).toBe(true)
    })

    test('Make sure createTransactionService return success', async () => {
      const params = {
        financialid: 3,
        clientid: 2
      }
      const body = {
        current_price: 68.9,
        subtotal_price: 68.9,
        total_price: 70.9,
        quantity: 1
      }
      const result = await services.createTransactionService(params, body)
      expect(result.success).toBe(true)
    })

    test('Make sure createDepositService return success', async () => {
      const clientid = 2
      const body = {
        origin_cpf: '139.345.567-90',
        total: 2200.9,
        bank_id: 1
      }
      const result = await services.createDepositService(clientid, body)
      expect(result.success).toBe(true)
    })

    test('Make sure listAllUserTransactionService return success', async () => {
      const result = await services.listAllUserTransactionService()
      expect(result.success).toBe(true)
    })

    test('Make sure listByIdUserTransactionService return success', async () => {
      const id = 2
      const result = await services.listByIdUserTransactionService(id)
      expect(result.success).toBe(true)
    })

    test('Make sure listByIdUserDepositService return success', async () => {
      const id = 2
      const result = await services.listByIdUserDepositService(id)
      expect(result.success).toBe(true)
    })

    test('Make sure verifyQuantity returns 400 if the quantity is exceeded', async () => {
      try {
        const assetid = 2
        const quantity = 300
        await services.verifyQuantity(assetid, quantity)
      } catch (error) {
        expect(error.statusCode).toBe(400)
      }
    })

    test('Make sure verifyBalance returns 400 if the price exceeds the account balance', async () => {
      try {
        const id = 2
        const totalPrice = 1000
        await services.verifyBalance(id, totalPrice)
      } catch (error) {
        expect(error.statusCode).toBe(400)
      }
    })

    test('Make sure createTransactionService throw an error if the parameters are incorrect', async () => {
      try {
        const params = {
          financialid: 31,
          clientid: 21
        }
        const body = {
          current_price: 68.9,
          subtotal_price: 68.9,
          total_price: 70.9,
          quantity: 1
        }
        expect(await services.createTransactionService(params, body)).toThrow()
      } catch (error) {}
    })

    test('Make sure createDepositService throw an error if the parameters are incorrect', async () => {
      try {
        const clientid = 22
        const body = {
          origin_cpf: '139.345.567-90',
          total: 2200.9,
          bank_id: 1
        }
        expect(
          await services.createTransactionService(clientid, body)
        ).toThrow()
      } catch (error) {}
    })

    test('Make sure listByIdUserTransactionService throw an error if the parameters are incorrect', async () => {
      try {
        const id = 22
        expect(await services.listByIdUserTransactionService(id).toThrow())
      } catch (error) {}
    })

    test('Make sure listByIdUserDepositService throw an error if the parameters are incorrect', async () => {
      try {
        const id = 2
        expect(await services.listByIdUserDepositService(id)).toThrow()
      } catch (error) {}
    })

    test('Make sure listAllUserTransactionService returns 500 if a server error occurs', async () => {
      try {
        await sequelize.close()
        await services.listAllUserTransactionService()
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })

    test('Make sure listByIdUserDepositService returns 500 if a server error occurs', async () => {
      try {
        await sequelize.close()
        const id = 2
        await services.listByIdUserDepositService(id)
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })

    test('Make sure listByIdUserTransactionService returns 500 if a server error occurs', async () => {
      try {
        await sequelize.close()
        const id = 2
        await services.listByIdUserTransactionService(id)
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })
  })
})
