const pool = require('../../config/db')
const bcrypt = require('bcrypt')

/**
 * @POST
 * Register API
 *
 * @requires
 *  @username - the username
 *  @email - the email
 *  @password - the password
 */
const register = async (req, res) => {
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
}

module.exports = register
