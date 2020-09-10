const express = require('express')
const cors = require('cors')
const pool = require('./config/db')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send({
    msg: 'Hello World',
  })
})

/**
 * Getting data
 *
 * no requirement
 */
app.get('/devices', async (req, res) => {
  const response = await pool.query('SELECT * FROM devices')

  res.send(response.rows)
})

/**
 * Posting data
 *
 * require:
 * {
 *  name: string,
 *  lng: double,
 *  lat: double,
 * }
 */
app.post('/devices', async (req, res) => {
  const { name, lng, lat } = req.body

  try {
    const response = await pool.query(
      'INSERT INTO devices(name, lng, lat) VALUES($1, $2, $3) RETURNING *',
      [name, lng, lat],
    )

    res.send(response.rows)
  } catch (error) {
    console.error(error)
  }
})

app.listen(5000, () => {
  console.log('Server started on 5000')
})
