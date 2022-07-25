module.exports = (sequelize, DataTypes) => {
  const transfer = sequelize.define(
    'transfer',
    {
      cod_transfer: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      deposit_value: {
        allowNull: false,
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0
      },
      origin_cpf: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      current_date: {
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
      tableName: 'transfer'
    }
  )

  transfer.associate = function (models) {
    transfer.belongsTo(models.transaction, {
      foreignKey: 'transaction_id',
      as: 'transaction'
    }),
    transfer.belongsTo(models.bank, {
      foreignKey: 'bank_id',
      as: 'bank'
    })
  }
  return transfer
}
