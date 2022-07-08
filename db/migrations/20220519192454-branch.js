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
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Agência 01'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('branch')
  }
}
