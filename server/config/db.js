const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  database: 'siab',
  password: 'admin',
  host: 'localhost',
  port: 5432,
})

module.exports = pool
