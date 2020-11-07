const pool = require('../../config/db')
const bcrypt = require('bcrypt')
const Joi = require('joi')

const updateUname = async (req, res) => {
  const { id } = req.session
  const { newUsername, password } = req.body
  try {
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

    const schema = Joi.object({
      newUsername: Joi.string().alphanum().min(4).max(20),
    })

    const validate = schema.validate({ newUsername })

    if (validate.error) {
      throw new Error(validate.error)
    }

    const isUsername = await pool.query(
      'SELECT * FROM logins WHERE username = $1',
      [newUsername],
    )

    if (isUsername.rowCount !== 0) {
      throw new Error('Username already exist')
    }

    const update = await pool.query(
      'UPDATE logins SET username = $1, modified_at = $2 WHERE id = $3 RETURNING *',
      [newUsername, Date.now(), id],
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
