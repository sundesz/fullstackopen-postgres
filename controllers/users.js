const bcrypt = require('bcrypt')
const { tokenExtractor, isValidUser } = require('../middleware')
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

userRouter.get('/:id', async (req, res) => {
  const where = {}

  if (req.query.read) {
    where.readState = req.query.read === 'true' ? 'read' : 'unread'
  }

  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
        through: {
          as: 'readinglists',
          attributes: ['readState', 'id'],
          where,
        },
      },
    ],
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

userRouter.put('/', tokenExtractor, isValidUser, async (req, res) => {
  const adminUser = await User.count({
    where: { admin: true, id: req.decodedToken.id },
  })

  if (!adminUser) {
    return res.status(401).json({ error: 'No permission' })
  }

  const disabled =
    req.body.disabled === true || req.body.disabled === 'true' ? true : false

  if (req.decodedToken.id === req.body.userId) {
    return res.status(401).json({ error: 'Cannot disabled yourself' })
  }

  if (!(await User.count({ where: { id: req.body.userId } }))) {
    return res.status(404).json({ error: 'User not found' })
  }

  await User.update({ disabled }, { where: { id: req.body.userId } })
  return res.status(201).json({ message: 'User updated successfully' })
})

module.exports = userRouter
