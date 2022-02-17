const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('sessions', {
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
      is_valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('sessions')
  },
}
