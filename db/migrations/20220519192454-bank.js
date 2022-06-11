'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('bank', {
      cod_bank: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      branch: {
        allowNull: false,
        type: Sequelize.TEXT
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('bank')
  }
}
