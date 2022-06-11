module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      cod_user: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      email: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      cpf: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      gender: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      birth_date: {
        allowNull: false,
        type: DataTypes.DATE
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      phone: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      kind: {
        allowNull: false,
        type: DataTypes.TEXT
      }
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: false,
      freezeTableName: true,
      tableName: 'user'
    }
  )

  user.associate = function (models) {
    user.hasMany(models.account, {
      foreignKey: 'account_id',
      as: 'account'
    })

    user.belongsTo(models.address, {
      foreignKey: 'address_id',
      as: 'address'
    })
  }
  return user
}
