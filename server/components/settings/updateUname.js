const pool = require('../../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const updateUname = async (req, res) => {
  const { token, newUsername, password } = req.body
  try {
    const { id } = jwt.decode(token, process.env.JWT_SECRET)

    const response = await pool.query('SELECT * FROM logins WHERE id = $1', [
      id,
    ])

    if (response.rowCount === 0) {
      throw new Error('Who are you?')
    }

    const isPassword = await bcrypt.compare(password, response.rows[0].password)

    if (!isPassword) {
      throw new Error('Check your password again!')
    }

    const isUsername = await pool.query(
      'SELECT * FROM logins WHERE username = $1',
      [newUsername],
    )

    if (isUsername.rowCount !== 0) {
      throw new Error('Username already exist')
    }

    const update = await pool.query(
      'UPDATE logins SET username = $1 where id = $2 RETURNING *',
      [newUsername, id],
    )

    if (update.rowCount === 0) {
      throw new Error('Error while updating your username!')
    }

    res.send(update)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = updateUname