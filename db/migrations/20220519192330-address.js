'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('address', {
      cod_address: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      uf: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      city: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      zip_code: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      complement: {
        allowNull: true,
        type: Sequelize.TEXT
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('address')
  }
}
