module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define(
    'account',
    {
      cod_account: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      number: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      type: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      balance: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      open_date: {
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
      tableName: 'account'
    }
  )

  account.associate = function (models) {
    account.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user'
    })

    account.belongsTo(models.branch, {
      foreignKey: 'branch_id',
      as: 'branch'
    })
  }
  return account
}
