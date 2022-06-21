'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('account', {
      cod_account: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      balance: {
        allowNull: false,
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0
      },
      open_date: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'user', key: 'cod_user' },
        onDelete: 'CASCADE'
      },
      bank_id: {
        type: Sequelize.INTEGER,
        references: { model: 'bank', key: 'cod_bank' },
        onDelete: 'CASCADE'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('account')
  }
}
