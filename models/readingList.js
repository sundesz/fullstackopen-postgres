const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../util/db')

class ReadingList extends Model {}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
    },
    readState: {
      type: DataTypes.ENUM('read', 'unread'),
      defaultValue: 'unread',
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,

    freezeTableName: true,
    tableName: 'reading_list',
    indexes: [
      {
        name: 'reading_list_unique_key',
        unique: true,
        fields: ['userId', 'blogId'],
      },
    ],
  }
)

module.exports = ReadingList
