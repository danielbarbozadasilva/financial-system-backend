module.exports = (sequelize, DataTypes) => {
  const address = sequelize.define(
    'address',
    {
      cod_address: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      address: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      uf: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      city: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      zip_code: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      complement: {
        allowNull: true,
        type: DataTypes.TEXT
      }
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: false,
      freezeTableName: true,
      tableName: 'address'
    }
  )

  return address
}
