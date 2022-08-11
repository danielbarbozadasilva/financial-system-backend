'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'bank',
      [
        {
          name: 'Banco 01'
        },
        {
          name: 'Banco 02'
        },
        {
          name: 'Banco 03'
        }
      ],
      {
        updateOnDuplicate: ['name'],
        ignoreDuplicates: true
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bank', null, {})
  }
}
