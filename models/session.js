const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isValid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    model: 'session',
    defaultScope: {
      where: {
        isValid: true,
      },
    },
  }
)

module.exports = Session
