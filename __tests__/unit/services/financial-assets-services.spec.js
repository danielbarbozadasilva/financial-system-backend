const services = require('../../../api/services/services.financial_asset')
const { sequelize } = require('../../../api/models/models.index')

describe('Financial asset services', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Financial asset services', () => {
    test('Make sure listFinancialAssetsService returns 200 on success', async () => {
      const result = await services.listFinancialAssetsService()
      expect(result.success).toBe(true)
    })

    test('Make sure listByIdFinancialAssetsService returns 200 on success', async () => {
      const id = 1
      const result = await services.listByIdFinancialAssetsService(id)
      expect(result.success).toBe(true)
    })

    test('Make sure createFinancialAssetsService returns 200 on success', async () => {
      const body = {
        name: 'example',
        description: 'description',
        current_price: '31.99',
        bvmf: 'MELI34',
        quantity: '100',
        image: {
          type: 'image/jpeg',
          origin: 'img01.jpg',
          old_path:
            'C:\\Users\\pc01\\Desktop\\financial-system-backend\\api\\utils\\file\\financial\\img01.jpg',
          newName: 'img01.jpg',
          new_path:
            'C:\\Users\\pc01\\Desktop\\financial-system-backend\\api\\utils\\file\\financial\\img01.jpg'
        }
      }
      const result = await services.createFinancialAssetsService(body)
      expect(result.success).toBe(true)
    })

    test('Make sure listFinancialAssetsService returns 500 if a server error occurs', async () => {
      try {
        await sequelize.close()
        await services.listFinancialAssetsService()
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })

    test('Make sure listByIdFinancialAssetsService returns 500 if a server error occurs', async () => {
      try {
        await sequelize.close()
        const id = 1
        await services.listByIdFinancialAssetsService(id)
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })
    test('Make sure createFinancialAssetsService returns 500 if a server error occurs', async () => {
      try {
        await sequelize.close()
        const body = {
          name: 'example',
          description: 'description',
          current_price: '31.99',
          bvmf: 'MELI34',
          quantity: '100',
          image: {
            type: 'image/jpeg',
            origin: 'img01.jpg',
            old_path:
              'C:\\Users\\pc01\\Desktop\\financial-system-backend\\api\\utils\\file\\financial\\img01.jpg',
            newName: 'img01.jpg',
            new_path:
              'C:\\Users\\pc01\\Desktop\\financial-system-backend\\api\\utils\\file\\financial\\img01.jpg'
          }
        }
        await services.createFinancialAssetsService(body)
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })
  })
})
