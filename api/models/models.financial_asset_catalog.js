module.exports = (sequelize, DataTypes) => {
  const assets = sequelize.define(
    'assets',
    {
      cod_fin_asset: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      bvmf: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      current_price: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      image: {
        allowNull: false,
        type: DataTypes.JSON
      }
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: false,
      freezeTableName: true,
      tableName: 'assets'
    }
  )

  assets.associate = function (models) {
    assets.hasMany(models.transactiondetails, {
      foreignKey: 'financial_asset_id',
      as: 'transactiondetails'
    })
  }
  return assets
}
