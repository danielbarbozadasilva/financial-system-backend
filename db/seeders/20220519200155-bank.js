'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'bank',
      [
        {
          name: 'Banco 01',
          branch: '0123'
        },
        {
          name: 'Banco 02',
          branch: '0456'
        },
        {
          name: 'Banco 03',
          branch: '0789'
        },
        {
          name: 'Banco 04',
          branch: '0098'
        }
      ],
      {
        updateOnDuplicate: ['name', 'branch'],
        ignoreDuplicates: true
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bank', null, {})
  }
}
