'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('branch', {
      cod_branch: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('branch')
  }
}
