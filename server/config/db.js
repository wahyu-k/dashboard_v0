const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASS,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
})

module.exports = pool
