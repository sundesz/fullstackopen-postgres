require('dotenv').config()

const express = require('express')
require('express-async-errors')
const authorRouter = require('./controllers/authors')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const readingListRouter = require('./controllers/readingList')
const userRouter = require('./controllers/users')
const { unknownEndpoint, errorHandler } = require('./middleware')
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Sandesh Blog</h1>')
})
app.use('/api/blogs', blogRouter)
app.use('/api/authors', authorRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/readinglists', readingListRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log('listening on port ', PORT)
  })
}

start()
