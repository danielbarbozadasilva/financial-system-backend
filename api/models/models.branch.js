module.exports = (sequelize, DataTypes) => {
  const branch = sequelize.define(
    'branch',
    {
      cod_branch: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      bank: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 233
      }
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: false,
      freezeTableName: true,
      tableName: 'branch'
    }
  )

  branch.associate = function (models) {
    branch.hasMany(models.account, {
      foreignKey: 'branch_id',
      as: 'branch'
    })
  }

  return branch
}
