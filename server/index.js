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
 * @GET
 * Hello API
 *
 * @readonly
 */
app.get('/', (req, res) => {
  res.json({
    msg: 'Hello API 👋',
  })
})

/**
 * @GET
 * Device API
 *
 * @readonly
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
 * @POST
 * Posting data
 *
 * @requires
 *  @name - the device name
 *  @lng - the longitude
 *  @lat - the latitude
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
 * @POST
 * Posting the sensors data
 *
 * @requires
 *  @ph - the ph value
 *  @tds - the tds value
 *  @turb - the turbidity value
 *  @temp - the temperature value
 *  @flow - the flow value
 *  @device_id - the device id
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
 * @POST
 * Register API
 *
 * @requires
 *  @username - the username
 *  @email - the email
 *  @password - the password
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
 * @POST
 * Login API
 *
 * @requires
 *  @uoe -this is the username or email
 *  @password - the password
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
        id: data.rows[0].id,
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
 * @GET
 * Sensors API
 *
 * @readonly
 */
app.get('/v1/sensors', async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM sensors')

    res.send(response.rows)
  } catch (error) {
    res.send(error.message)
  }
})

/**
 * @POST
 * Forget Password API
 *
 * @requires
 *  @receiver - the receiver's email
 */
app.post('/v1/forget_password', async (req, res) => {
  const { receiver } = req.body

  try {
    const response = await pool.query('SELECT * FROM logins WHERE email = $1', [
      receiver,
    ])

    if (response.rowCount === 0) {
      throw new Error("Can't find the email!")
    }

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

    const jwtAuth = await jwt.sign(
      { email: receiver },
      process.env.JWT_SECRET,
      {
        expiresIn: '2h',
      },
    )

    const info = await mail.sendMail({
      from: '"Siaga Air Bersih" <no-reply@siagaairbersih.com>', // sender address
      to: receiver, // list of receivers
      subject: 'Password Reset', // Subject line
      html: `<p>Here is the link to reset your password<p>
             <br />
             <a>localhost:3000/reset_password/${jwtAuth}</a>`, // html body
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

/**
 * @POST
 * Reset Password API
 *
 * @requires
 *  @token - token from the email that contains the email (exp in 2 hour)
 *  @newPassword - the new password
 */
app.post('/v1/reset_password', async (req, res) => {
  const { token, newPassword } = req.body

  try {
    const { email } = await jwt.decode(token, process.env.JWT_SECRET)

    if (!email) {
      throw new Error('Failed!')
    }

    const password = await bcrypt.hash(newPassword, 7)

    const response = await pool.query(
      'UPDATE logins SET password = $1 WHERE email = $2 RETURNING *',
      [password, email],
    )

    res.send(response.rows)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

/**
 * @POST
 * Check Token API
 *
 * @requires
 *  @token - token from the local storage
 */
app.post('/v1/check_token', async (req, res) => {
  const { token } = req.body
  try {
    const { username } = await jwt.decode(token, process.env.JWT_SECRET)

    if (!username) {
      throw new Error('Failed token!')
    }

    const response = await pool.query(
      'SELECT * FROM logins WHERE username = $1',
      [username],
    )

    if (response.rowCount !== 0) {
      res.send(response.rows[0])
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.get('/v1/admin/logins', async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM logins')

    res.send(response.rows)
  } catch (error) {
    res.send(error.message)
  }
})

app.listen(5000, () => {
  console.log('Server started on 5000')
})
