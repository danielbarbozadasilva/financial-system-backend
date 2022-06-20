'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'transaction',
      [
        {
          total_quantity: 1,
          sub_total: 61.2,
          total_price: 53.95,
          user_id: 2
        },
        {
          total_quantity: 1,
          sub_total: 62.0,
          total_price: 64.19,
          user_id: 3
        },
        {
          total_quantity: 1,
          sub_total: 30.2,
          total_price: 31.99,
          user_id: 3
        },
        {
          total_quantity: 1,
          sub_total: 30.17,
          total_price: 32.12,
          user_id: 4
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
