require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')

const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

// const main = async () => {
//   try {
//     await sequelize.authenticate()
//     console.log('Connection has been established successfully.')
//     sequelize.close()
//   } catch (error) {
//     console.log('Unable to connect to database:', error)
//   }
// }

// main()

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
)

Blog.sync()

app.get('/', (req, res) => {
  res.send('<h1>Sandesh Blog</h1>')
})

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.findAll()
    console.log(blogs.map((b) => b.toJSON()))
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
  } catch (error) {
    console.error('error: ', error)
  }
})

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    console.error('error: ', error)
  }
})

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      return res.json(blog)
    }

    res.status(404).end()
  } catch (error) {
    console.error('error: ', error)
  }
})

app.put('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      blog.likes = req.body.likes
      await blog.save()
      return res.json(blog)
    }

    res.status(404).end()
  } catch (error) {
    console.error('error: ', error)
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      await blog.destroy()
      return res.status(204).end()
    }

    res.status(404).end()
  } catch (error) {
    console.error('error: ', error)
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('listening on port ', PORT)
})
