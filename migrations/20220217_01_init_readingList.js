const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('reading_list', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
      },
      read_state: {
        type: DataTypes.ENUM('read', 'unread'),
        defaultValue: 'unread',
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('reading_list')
  },
}
