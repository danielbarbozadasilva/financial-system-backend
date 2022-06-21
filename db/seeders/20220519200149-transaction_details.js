'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'transaction_details',
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
    await queryInterface.bulkDelete('transaction_details', null, {})
  }
}
