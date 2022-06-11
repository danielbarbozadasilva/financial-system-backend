'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'transaction_details',
      [
        {
          current_date: '2000-09-09',
          quantity: 1,
          purchase_price: 53.95,
          financial_asset_id: 1,
          transaction_id: 1
        },
        {
          current_date: '2000-09-09',
          quantity: 1,
          purchase_price: 64.19,
          financial_asset_id: 2,
          transaction_id: 2
        },
        {
          current_date: '2000-09-09',
          quantity: 1,
          purchase_price: 31.99,
          financial_asset_id: 3,
          transaction_id: 3
        },
        {
          current_date: '2000-09-09',
          quantity: 1,
          purchase_price: 32.12,
          financial_asset_id: 4,
          transaction_id: 4
        }
      ],
      {
        updateOnDuplicate: [
          'current_date',
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
