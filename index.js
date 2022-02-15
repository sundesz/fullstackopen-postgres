require('dotenv').config()

const express = require('express')
const authorRouter = require('./controllers/authors')
require('express-async-errors')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const { unknownEndpoint, errorHandler } = require('./middleware')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Sandesh Blog</h1>')
})
app.use('/api/blogs', blogRouter)
app.use('/api/authors', authorRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('listening on port ', PORT)
})
