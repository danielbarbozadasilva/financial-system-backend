'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('transfer', {
      cod_transfer: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      deposit_value: {
        allowNull: false,
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0
      },
      origin_cpf: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      current_date: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      bank_id: {
        type: Sequelize.INTEGER,
        references: { model: 'bank', key: 'cod_bank' },
        onDelete: 'CASCADE'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('transfer')
  }
}
