'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('transaction', {
      cod_transaction: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(15, 2)
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'user', key: 'cod_user' },
        onDelete: 'CASCADE'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('transaction')
  }
}
