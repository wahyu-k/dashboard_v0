const pool = require('../../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * @POST
 * Login API
 *
 * @requires
 *  @uoe -this is the username or email
 *  @password - the password
 */
const login = async (req, res) => {
  const { uoe, password } = req.body

  let data = null

  try {
    data = await pool.query(
      'SELECT logins.*, users.plan FROM logins INNER JOIN users ON logins.id = users.id WHERE logins.username = $1',
      [uoe],
    )

    if (data.rowCount === 0) {
      data = await pool.query(
        'SELECT logins.*, users.plan FROM logins INNER JOIN users ON logins.id = users.id WHERE logins.email = $1',
        [uoe],
      )

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
        plan: data.rows[0].plan,
      },
      process.env.JWT_SECRET,
    )

    res.send(jwtToken)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

module.exports = login
