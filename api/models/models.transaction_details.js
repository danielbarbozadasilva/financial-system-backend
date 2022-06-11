module.exports = (sequelize, DataTypes) => {
  const transaction_details = sequelize.define(
    'transaction_details',
    {
      cod_trans_details: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      current_date: {
        allowNull: false,
        type: DataTypes.DATE
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      purchase_price: {
        allowNull: false,
        type: DataTypes.DECIMAL(15, 2)
      }
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: false,
      freezeTableName: true,
      tableName: 'transaction_details'
    }
  )

  transaction_details.associate = function (models) {
    transaction_details.belongsTo(models.transaction, {
      foreignKey: 'transaction_id',
      as: 'transaction'
    })

    transaction_details.belongsTo(models.financial_asset_catalog, {
      foreignKey: 'financial_asset_id',
      as: 'financial_asset_catalog'
    })
  }
  return transaction_details
}
