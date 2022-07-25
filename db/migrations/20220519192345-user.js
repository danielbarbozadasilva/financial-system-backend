'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('user', {
      cod_user: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      email: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      cpf: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      gender: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      birth_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      phone: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      kind: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      address_id: {
        type: Sequelize.INTEGER,
        references: { model: 'address', key: 'cod_address' },
        onDelete: 'CASCADE'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('user')
  }
}
