'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'transfer',
      [
        {
          origin_cpf: '413.212.223-90',
          deposit_value: 2500.2,
          bank_id: 1
        },
        {
          origin_cpf: '123.432.123-98',
          deposit_value: 1250.4,
          bank_id: 2
        },
        {
          origin_cpf: '221.232.421-18',
          deposit_value: 1700.1,
          bank_id: 3
        }
      ],
      {
        updateOnDuplicate: ['origin_cpf', 'deposit_value', 'bank_id'],
        ignoreDuplicates: true
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transfer', null, {})
  }
}
