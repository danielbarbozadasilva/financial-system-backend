module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('assets', {
      cod_fin_asset: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      bvmf: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      current_price: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      image: {
        allowNull: false,
        type: Sequelize.JSON
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('assets')
  }
}
