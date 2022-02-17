const { tokenExtractor } = require('../middleware')
const { User, Blog, ReadingList } = require('../models')

const readingListRouter = require('express').Router()

readingListRouter.post('/', async (req, res) => {
  const user = await User.findByPk(req.body.userId, { attributes: ['id'] })
  const blog = await Blog.findByPk(req.body.blogId, { attributes: ['id'] })

  if (user && blog) {
    const readingList = await ReadingList.create({
      userId: user.id,
      blogId: blog.id,
    })

    return res.json(readingList)
  }

  res.status(404).json({ error: 'Blog or user not found' })
})

readingListRouter.put('/:blogId', tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findOne({
    where: { blogId: req.params.blogId, userId: req.decodedToken.id },
  })

  if (readingList) {
    const readState = req.body.read === 'true' || req.body.read === true
    readingList.readState = readState ? 'read' : 'unread'
    await readingList.save()

    return res.json(readingList)
  }

  res.status(404).json({ error: 'Blog or user not found' })
})

module.exports = readingListRouter
