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
        allowNull: true,
        type: DataTypes.TEXT,
        defaultValue: 'Banco 01'
      },
      branch: {
        allowNull: true,
        type: DataTypes.TEXT,
        defaultValue: '0845'
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
  
  return bank
}
