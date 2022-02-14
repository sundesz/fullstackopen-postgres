const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log(error)
  switch (error.name) {
    case 'SequelizeValidationError':
      return res.status(400).send({ error: error.message })
    default:
      return res.status(400).send({ error: error.message })
  }
  next(error)
}

module.exports = { unknownEndpoint, errorHandler }
