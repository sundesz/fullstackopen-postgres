const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addConstraint('reading_list', {
      type: 'unique',
      name: 'reading_list_unique_key',
      fields: ['user_id', 'blog_id'],
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint('reading_list_unique_key')
  },
}
