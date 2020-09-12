require('dotenv').config()

const express = require('express')
const cors = require('cors')
const pool = require('./config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
// const mail = require('./config/mail')

const app = express()
app.use(express.json())
app.use(cors())

/**
 * Hello API
 */
app.get('/', (req, res) => {
  res.json({
    msg: 'Hello API 👋',
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

/**
 * Register API
 *
 * require: {
 *  username: string.
 *  email: string,
 *  password, string
 * }
 */
app.post('/v1/register', async (req, res) => {
  const { username, email, password } = req.body

  try {
    const isUsername = await pool.query(
      'SELECT * FROM logins WHERE username = $1',
      [username],
    )

    if (isUsername.rowCount !== 0) {
      throw new Error('Username already exist!')
    }

    const isEmail = await pool.query('SELECT * FROM logins WHERE email = $1', [
      email,
    ])

    if (isEmail.rowCount !== 0) {
      throw new Error('Email already exist!')
    }

    const hashPassword = await bcrypt.hash(password, 7)

    const response = await pool.query(
      'INSERT INTO logins(username, email, password, created_at) VALUES($1, $2, $3, $4) RETURNING *',
      [username, email, hashPassword, Date.now()],
    )

    res.send(response.rows)
  } catch (error) {
    res.status(409).send(error.message)
  }
})

/**
 * Login API
 *
 * require: {
 *  uoe: string (this is the username or email)
 *  password: string
 * }
 */
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

    const jwtToken = await jwt.sign(
      {
        username: data.rows[0].username,
      },
      process.env.JWT_SECRET,
    )

    res.send(jwtToken)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

/**
 * Sensors API (GET the sensors data)
 *
 * no requirement
 */
app.get('/v1/sensors', async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM sensors')

    res.send(response.rows)
  } catch (error) {
    res.send(error.message)
  }
})

app.post('/v1/forget_password', async (req, res) => {
  const { receiver } = req.body

  try {
    const testAccount = await nodemailer.createTestAccount()

    // create reusable transporter object using the default SMTP transport
    const mail = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    })

    const jwtAuth = await jwt.sign({ email: receiver }, process.env.JWT_SECRET)

    const info = await mail.sendMail({
      from: '"Siaga Air Bersih" <no-reply@siagaairbersih.com>', // sender address
      to: receiver, // list of receivers
      subject: 'Password Reset', // Subject line
      html: `<p>Here is the link to reset your password<p>
             <br />
             <a>localhost:3000/v1/reset_password/${jwtAuth}</a>`, // html body
    })

    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

    if (info.messageId) {
      // res.send(info.messageId)
      res.send(nodemailer.getTestMessageUrl(info))
    } else {
      throw new Error('Not Send!')
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.post('/v1/reset_password/:token', async (req, res) => {
  const { email, newPassword } = req.body
  const token = req.params.token

  console.log(email, newPassword, token)
})

app.listen(5000, () => {
  console.log('Server started on 5000')
})
