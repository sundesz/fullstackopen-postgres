require('dotenv').config()

const express = require('express')
require('express-async-errors')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
} = require('./middleware')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Sandesh Blog</h1>')
})
app.use('/api/blogs', tokenExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('listening on port ', PORT)
})
