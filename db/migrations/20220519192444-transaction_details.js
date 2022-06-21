'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('transaction_details', {
      cod_trans_details: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      current_date: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      purchase_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(15, 2)
      },
      financial_asset_id: {
        type: Sequelize.INTEGER,
        references: { model: 'financial_asset_catalog', key: 'cod_fin_asset' },
        onDelete: 'CASCADE'
      },
      transaction_id: {
        type: Sequelize.INTEGER,
        references: { model: 'transaction', key: 'cod_transaction' },
        onDelete: 'CASCADE'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('transaction_details')
  }
}
