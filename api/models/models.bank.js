module.exports = (sequelize, DataTypes) => {
  const bank = sequelize.define(
    'bank',
    {
      cod_bank: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      branch: {
        allowNull: false,
        type: DataTypes.TEXT
      }
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: false,
      freezeTableName: true,
      tableName: 'bank'
    }
  )

  bank.associate = function (models) {
    bank.hasMany(models.account, {
      foreignKey: 'bank_id',
      as: 'bank'
    })
  }

  return bank
}
