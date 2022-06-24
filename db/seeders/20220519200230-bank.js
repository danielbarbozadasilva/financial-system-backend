'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'bank',
      [
        {
          name: 'Banco 01',
          branch: '0845'
        },
        {
          name: 'Banco 02',
          branch: '0121'
        },
        {
          name: 'Banco 03',
          branch: '0443'
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
