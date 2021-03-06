const { tokenExtractor } = require('../middleware')
const { Session } = require('../models')

const logoutRouter = require('express').Router()

logoutRouter.delete('/', tokenExtractor, async (req, res) => {
  // const session = await Session.findOne({
  //   attributes: ['id', 'isValid', 'userId'],
  //   where: { userId: req.decodedToken.id },
  // })

  // if (session) {
  //   session.isValid = false
  //   await session.save()

  //   res.json({ message: 'Logout successful' })
  // }

  await Session.destroy({ where: { userId: req.decodedToken.id } })
  res.json({ message: 'Logout successful' })
})

module.exports = logoutRouter
