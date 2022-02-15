const authorRouter = require('express').Router()
const Sequelize = require('sequelize')
const { Blog } = require('../models')

authorRouter.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'articles'],
      'likes',
    ],
    group: ['author', 'likes'],
    order: [['likes', 'desc']],
  })

  res.json(authors)
})

module.exports = authorRouter
