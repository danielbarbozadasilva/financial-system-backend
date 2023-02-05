module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'transfer',
      [
        {
          deposit_value: '2200.90',
          origin_cpf: '139.345.567-90',
          transaction_id: 7,
          bank_id: 1
        }
      ],
      {
        updateOnDuplicate: [
          'deposit_value',
          'origin_cpf',
          'transaction_id',
          'bank_id'
        ],
        ignoreDuplicates: true
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transfer', null, {})
  }
}
