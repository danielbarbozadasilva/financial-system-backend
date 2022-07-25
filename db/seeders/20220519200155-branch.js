'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'branch',
      [
        {
          name: 'Agência 01'
        },
        {
          name: 'Agência 02'
        },
        {
          name: 'Agência 03'
        },
        {
          name: 'Agência 04'
        }
      ],
      {
        updateOnDuplicate: ['name'],
        ignoreDuplicates: true
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('branch', null, {})
  }
}
