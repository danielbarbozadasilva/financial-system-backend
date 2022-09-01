module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'transactiondetails',
      [
        {
          quantity: 1,
          purchase_price: 53.95,
          financial_asset_id: 1,
          transaction_id: 1
        },
        {
          quantity: 1,
          purchase_price: 64.19,
          financial_asset_id: 2,
          transaction_id: 2
        },
        {
          quantity: 1,
          purchase_price: 31.99,
          financial_asset_id: 3,
          transaction_id: 3
        },
        {
          quantity: 1,
          purchase_price: 32.12,
          financial_asset_id: 4,
          transaction_id: 4
        },
        {
          quantity: 1,
          purchase_price: 64.19,
          financial_asset_id: 2,
          transaction_id: 5
        },
        {
          quantity: 1,
          purchase_price: 64.19,
          financial_asset_id: 7,
          transaction_id: 6
        },
        {
          quantity: 1,
          purchase_price: 34.93,
          financial_asset_id: 8,
          transaction_id: 7
        }
      ],
      {
        updateOnDuplicate: [
          'quantity',
          'purchase_price',
          'financial_asset_id',
          'transaction_id'
        ],
        ignoreDuplicates: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transactiondetails', null, {})
  }
}
