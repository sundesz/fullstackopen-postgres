const jwt = require('jsonwebtoken')
const { Sequelize } = require('sequelize')
const { User, Session } = require('../models')
const { SECRET } = require('../util/config')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log(error)
  switch (error.name) {
    case 'SequelizeValidationError':
      return res.status(400).send({ error: error.errors[0].message })
    case 'SequelizeUniqueConstraintError':
      return res.status(400).send({ error: error.errors[0].message })
    case 'SequelizeDatabaseError':
      return res.status(400).send({ error: error.message })
    case 'JsonWebTokenError':
      return res.status(400).send({ error: error.message })
    default:
      return res.status(400).send({ error: error.message })
  }
  next(error)
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')

  if (!authorization && !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).send({ error: 'Missing token' })
  }

  const authorizationToken = authorization.substring(7)
  token = jwt.verify(authorizationToken, SECRET)

  const sessionExists = await Session.count({
    //isValid is checked from model defaultScope
    where: { token: authorizationToken },
  })

  if (!sessionExists) {
    return res.status(401).send({ error: 'Token expired' })
  }

  req.decodedToken = token

  next()
}

const isValidUser = async (req, res, next) => {
  const isUserDisabled = await User.count({
    where: { id: req.decodedToken.id, disabled: false },
  })

  if (!isUserDisabled) {
    return res
      .status(401)
      .send({ error: 'User is disabled. Please contact admin' })
  }

  next()
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor, isValidUser }
