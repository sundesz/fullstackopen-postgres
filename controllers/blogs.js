const blogRouter = require('express').Router()

const { Blog, User } = require('../models')

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name'],
      },
    })
    // console.log(blogs.map((b) => b.toJSON()))
    // console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog.findOne({
    attributes: { exclude: ['userId'] },
    where: { userId: req.decodedToken.id, id: req.params.id },
    include: { model: User, attributes: ['name'] },
  })

  if (blog) {
    return res.json(blog)
  }

  res.status(404).send({ error: 'Id not found' })
})

blogRouter.post('/', async (req, res, next) => {
  const blog = await Blog.create({ ...req.body, userId: req.decodedToken.id })
  return res.json(blog)
})

blogRouter.put('/:id', async (req, res, next) => {
  const blog = await Blog.findOne({
    attributes: { exclude: ['userId'] },
    where: { id: req.params.id, userId: req.decodedToken.id },
    include: { model: User, attributes: ['name'] },
  })

  if (blog) {
    blog.likes = req.body.likes
    await blog.save()
    return res.json(blog)
  }

  res.status(404).send({ error: 'Id not found' })
})

blogRouter.delete('/:id', async (req, res, next) => {
  const blog = await Blog.findOne({
    where: { userId: req.decodedToken.id },
  })

  if (blog) {
    await blog.destroy()
    return res.status(204).end()
  }

  res.status(404).send({ error: 'Id not found' })
})

module.exports = blogRouter
