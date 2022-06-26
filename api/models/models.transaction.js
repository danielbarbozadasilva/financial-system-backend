module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define(
    'transaction',
    {
      cod_transaction: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      total_quantity: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      type: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      sub_total: {
        allowNull: false,
        type: DataTypes.DECIMAL(15, 2)
      },
      total_price: {
        allowNull: false,
        type: DataTypes.DECIMAL(15, 2)
      }
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: false,
      freezeTableName: true,
      tableName: 'transaction'
    }
  )

  transaction.associate = function (models) {
    transaction.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user'
    })
    transaction.hasMany(models.transaction_details, {
      foreignKey: 'transaction_id',
      as: 'transaction_details'
    })
  }

  return transaction
}
