const services = require('../../../api/services/services.financial_asset')
const { sequelize } = require('../../../api/models/models.index')

describe('Financial asset services', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  describe('Financial asset services', () => {
    test('Make sure listFinancialAssetsService return success', async () => {
      const result = await services.listFinancialAssetsService()
      expect(result.success).toBe(true)
    })
    test('Make sure listFinancialAssetsService has the id property', async () => {
      const result = await services.listFinancialAssetsService()
      expect(result.data[0]).toHaveProperty('id')
    })
    test('Make sure listByIdFinancialAssetsService return success', async () => {
      const id = 1
      const result = await services.listByIdFinancialAssetsService(id)
      expect(result.success).toBe(true)
    })
    test('Make sure listByIdFinancialAssetsService has the id property', async () => {
      const id = 1
      const result = await services.listByIdFinancialAssetsService(id)
      expect(result.data).toHaveProperty('id')
    })
    test('Make sure listTop05FinancialAssetsService return success', async () => {
      const result = await services.listTop05FinancialAssetsService()
      expect(result.success).toBe(true)
    })
    test('Make sure listTop05FinancialAssetsService has the id property', async () => {
      const id = 1
      const result = await services.listTop05FinancialAssetsService(id)
      expect(result.data[0]).toHaveProperty('id')
    })

    test('Make sure createFinancialAssetsService return success', async () => {
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
            'C:\\Users\\pc01\\Desktop\\financial-system-backend\\api\\utils\\file\\financial\\img04.jpg',
          newName: 'img01.jpg',
          new_path:
            'C:\\Users\\pc01\\Desktop\\financial-system-backend\\api\\utils\\file\\financial\\img04.jpg'
        }
      }
      const result = await services.createFinancialAssetsService(body)
      expect(result.success).toBe(true)
    })

    test('Make sure updateFinancialAssetsService return success', async () => {
      const id = 1
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
            'C:\\Users\\pc01\\Desktop\\financial-system-backend\\api\\utils\\file\\financial\\img02.jpg',
          newName: 'img01.jpg',
          new_path:
            'C:\\Users\\pc01\\Desktop\\financial-system-backend\\api\\utils\\file\\financial\\img02.jpg'
        }
      }
      const result = await services.updateFinancialAssetsService(body, id)
      expect(result.success).toBe(true)
    })

    test('Make sure deleteFinancialAssetsService return success', async () => {
      const id = 1
      const result = await services.deleteFinancialAssetsService(id)
      expect(result.success).toBe(true)
    })
  })
})
