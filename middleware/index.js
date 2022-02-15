const jwt = require('jsonwebtoken')
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
    default:
      return res.status(400).send({ error: error.message })
  }
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (!authorization) {
    // if (!authorization && !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).send({ error: 'Missing token' })
  }

  try {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
  } catch (error) {
    return res.status(401).send({ error: 'Invalid token' })
  }

  next()
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor }
