module.exports = (sequelize, DataTypes) => {
  const financial_asset_catalog = sequelize.define(
    'financial_asset_catalog',
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
      tableName: 'financial_asset_catalog'
    }
  )

  financial_asset_catalog.associate = function (models) {
    financial_asset_catalog.hasMany(models.transaction_details, {
      foreignKey: 'financial_asset_id',
      as: 'transaction_details'
    })
  }
  return financial_asset_catalog
}
