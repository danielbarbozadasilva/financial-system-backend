'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'transaction',
      [
        {
          total_quantity: 1,
          sub_total: 53.95,
          total_price: 55.78,
          user_id: 2
        },
        {
          total_quantity: 1,
          sub_total: 64.19,
          total_price: 67.45,
          user_id: 3
        },
        {
          total_quantity: 1,
          sub_total: 31.99,
          total_price: 33.35,
          user_id: 3
        },
        {
          total_quantity: 1,
          sub_total: 32.12,
          total_price: 34.57,
          user_id: 4
        },
        {
          total_quantity: 1,
          sub_total: 64.19,
          total_price: 67.59,
          user_id: 5
        },
        {
          total_quantity: 1,
          sub_total: 34.93,
          total_price: 37.67,
          user_id: 6
        },
        {
          total_quantity: 1,
          sub_total: 2200.90,
          total_price: 2200.90,
          user_id: 3
        }
      ],
      {
        updateOnDuplicate: [
          'total_quantity',
          'sub_total',
          'total_price',
          'user_id'
        ],
        ignoreDuplicates: true
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transaction', null, {})
  }
}
