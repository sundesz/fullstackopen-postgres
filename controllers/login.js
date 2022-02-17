const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const { User, Blog, Session } = require('../models')
const { SECRET } = require('../util/config')

loginRouter.post('/', async (req, res) => {
  const user = await User.findOne({
    where: { username: req.body.username, disabled: false },
    include: {
      model: Blog,
      attributes: ['id', 'author', 'title', 'url', 'likes'],
    },
  })

  if (!user || !req.body.password) {
    return res.status(401).send({ error: 'Invalid username or password' })
  }

  const password = await bcrypt.compare(req.body.password, user.passwordHash)
  if (!password) {
    return res.status(401).send({ error: 'Invalid username or password' })
  }

  const dataForToken = {
    id: user.id,
    username: user.username,
  }

  const token = jwt.sign(dataForToken, SECRET)

  const session = await Session.findOne({
    attributes: ['id', 'token'],
    where: { userId: user.id },
  })

  if (session) {
    session.token = token
    await session.save()
  } else {
    await Session.create({ userId: user.id, token })
  }

  res.json({
    token,
    username: user.username,
    name: user.name,
    blogs: user.blogs,
  })
})

module.exports = loginRouter
