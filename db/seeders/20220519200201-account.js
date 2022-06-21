'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'account',
      [
        {
          type: 'C/C',
          balance: 2500.00,
          user_id: 1,
          bank_id: 1
        },
        {
          type: 'C/C',
          balance: 3100.00,
          user_id: 2,
          bank_id: 2
        },
        {
          type: 'C/C',
          balance: 1100.00,
          user_id: 3,
          bank_id: 3
        },
        {
          type: 'C/C',
          balance: 11400.00,
          user_id: 4,
          bank_id: 4
        }
      ],
      {
        updateOnDuplicate: ['type', 'balance', 'user_id', 'bank_id'],
        ignoreDuplicates: true
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('account', null, {})
  }
}
