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
      },
      created_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
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
    user.belongsTo(models.address, {
      foreignKey: 'address_id',
      as: 'address'
    })
  }
  return user
}
