const { Blog } = require('./models')

const init = async () => {
  const blogs = await Blog.findAll()
  blogs.map((blog) =>
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
  )
}

init()
