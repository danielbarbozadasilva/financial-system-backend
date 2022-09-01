module.exports = (sequelize, DataTypes) => {
  const transactiondetails = sequelize.define(
    'transactiondetails',
    {
      cod_trans_details: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      current_date: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
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
      tableName: 'transactiondetails'
    }
  )

  transactiondetails.associate = function (models) {
    transactiondetails.belongsTo(models.transaction, {
      foreignKey: 'transaction_id',
      as: 'transaction'
    })

    transactiondetails.belongsTo(models.assets, {
      foreignKey: 'financial_asset_id',
      as: 'assets'
    })
  }
  return transactiondetails
}
