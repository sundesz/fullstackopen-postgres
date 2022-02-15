const bcrypt = require('bcrypt')
const userRouter = require('express').Router()

const { User, Blog } = require('../models')
const { SALT } = require('../util/config')

userRouter.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] },
    include: {
      model: Blog,
      attributes: ['id', 'author', 'title', 'url', 'likes'],
    },
  })
  res.json(users)
})

userRouter.get('/:username', async (req, res) => {
  const user = await User.findOne({
    attributes: { exclude: ['passwordHash'] },
    where: { username: req.params.username },
    include: {
      model: Blog,
      attributes: ['id', 'author', 'title', 'url', 'likes'],
    },
  })

  if (user) {
    return res.json(user)
  }

  res.status(404).send({ message: 'User not found' })
})

userRouter.post('/', async (req, res) => {
  if (!req.body.password) {
    return res.status(400).send({ error: 'password field required' })
  }
  const passwordHash = await bcrypt.hash(req.body.password, Number(SALT))

  const user = await User.create({
    name: req.body.name,
    username: req.body.username,
    passwordHash,
  })

  const newUser = user.toJSON()
  delete newUser.passwordHash
  res.json(newUser)
})

module.exports = userRouter
