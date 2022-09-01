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
        allowNull: true,
        type: DataTypes.TEXT,
        defaultValue: Math.floor(Math.random() * String(65536124))+'-0'
      },
      type: {
        allowNull: true,
        type: DataTypes.TEXT,
        defaultValue: 'C/C'
      },
      balance: {
        allowNull: true,
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0
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
