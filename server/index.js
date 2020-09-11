const express = require('express')
const cors = require('cors')
const pool = require('./config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({
    msg: 'Hello World 👋',
  })
})

/**
 * Getting data
 *
 * no requirement
 */
app.get('/v1/devices', async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM devices')

    res.send(response.rows)
  } catch (error) {
    res.send(error)
    console.error(error)
  }
})

/**
 * Posting data
 *
 * require: {
 *  name: string,
 *  lng: double,
 *  lat: double,
 * }
 */
app.post('/v1/devices', async (req, res) => {
  const { name, lng, lat } = req.body

  try {
    const response = await pool.query(
      'INSERT INTO devices(name, lng, lat, created_at) VALUES($1, $2, $3, $4) RETURNING *',
      [name, lng, lat, Date.now()],
    )

    res.send(response.rows)
  } catch (error) {
    res.send(error)
    console.error(error)
  }
})

/**
 * Posting the sensors data
 *
 * require: {
 *  ph: double,
 *  tds: double,
 *  turb: double,
 *  temp: double,
 *  flow: double
 *  device_id: integer device id
 * }
 */
app.post('/v1/sensors', async (req, res) => {
  const { ph, tds, turb, temp, flow, device_id } = req.body

  try {
    const response = await pool.query(
      'INSERT INTO sensors(ph, tds, turb, temp, flow, device_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [ph, tds, turb, temp, flow, device_id],
    )

    res.send(response.rows)
  } catch (error) {
    res.send(error)
    console.error(error)
  }
})

app.post('/v1/register', async (req, res) => {
  const { username, email, password } = req.body

  try {
    const hashPassword = await bcrypt.hash(password, 7)

    const response = await pool.query(
      'INSERT INTO logins(username, email, password, created_at) VALUES($1, $2, $3, $4) RETURNING *',
      [username, email, hashPassword, Date.now()],
    )

    res.send(response.rows)
  } catch (error) {
    res.send(error)
  }
})

app.post('/v1/login', async (req, res) => {
  const { uoe, password } = req.body

  let data = null

  try {
    data = await pool.query('SELECT * FROM logins WHERE username = $1', [uoe])

    if (data.rowCount === 0) {
      data = await pool.query('SELECT * FROM logins WHERE email = $1', [uoe])

      if (data.rowCount === 0) {
        throw new Error('Wrong Email')
      }
    }

    const isPassword = await bcrypt.compare(password, data.rows[0].password)

    if (!isPassword) {
      throw new Error('Wrong Password')
    }

    res.send('OK')
  } catch (error) {
    res.send(error.message)
  }
})

app.get('/v1/sensors', async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM sensors')

    res.send(response.rows)
  } catch (error) {
    res.send(error.message)
  }
})

app.listen(5000, () => {
  console.log('Server started on 5000')
})
