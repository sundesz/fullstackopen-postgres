const authorRouter = require('express').Router()
const Sequelize = require('sequelize')
const { Blog } = require('../models')

authorRouter.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'articles'],
      [Sequelize.fn('SUM', Sequelize.col('likes')), 'likes'],
    ],
    group: ['author'],
    order: [[Sequelize.fn('SUM', Sequelize.col('likes')), 'ASC']],
  })

  res.json(authors)
})

module.exports = authorRouter
