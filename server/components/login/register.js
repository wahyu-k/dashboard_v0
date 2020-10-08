const pool = require('../../config/db')
const bcrypt = require('bcrypt')
const Joi = require('joi')

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
    const schema = Joi.object({
      username: Joi.string().alphanum().min(4).max(20),
      email: Joi.string().email(),
      password: Joi.string().min(8).max(100),
    })

    const validate = schema.validate({ username, email, password })

    if (validate.error) {
      throw new Error(validate.error)
    }

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
      'INSERT INTO logins(username, email, password, created_at, modified_at) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [username, email, hashPassword, Date.now(), Date.now()],
    )

    const postPersonData = await pool.query(
      'INSERT INTO users(id, first_name, last_name, dob, prov, region, plan, created_at, modified_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [response.rows[0].id, '', '', '', '', '', 0, Date.now(), Date.now()],
    )

    res.send({ createdData: response.rows, personData: postPersonData.rows })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = register
