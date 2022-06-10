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
      type: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      balance: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      open_date: {
        allowNull: false,
        type: DataTypes.DATE
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

    account.belongsTo(models.bank, {
      foreignKey: 'bank_id',
      as: 'bank'
    })
  }
  return account
}
