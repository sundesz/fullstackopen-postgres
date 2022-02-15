require('dotenv').config()

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
  SALT: process.env.SALT,
  SECRET: process.env.SECRET,
}
