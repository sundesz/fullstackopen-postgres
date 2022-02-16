const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      defaultValue: new Date().getFullYear(),
      validate: {
        // min: 1991,
        min: {
          args: 1991,
          msg: 'Year must be at least start from 1991',
        },
        // max: new Date().getFullYear(),
        max: {
          args: new Date().getFullYear(),
          msg: 'Year should not be greater than current year',
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog',
  }
)

module.exports = Blog
