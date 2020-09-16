const pool = require('../../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/**
 * @UPDATE
 * Update Password API
 *
 * @requires
 *  @token - web token
 *  @currentPass - the current password to confirm
 *  @newPassword - the new password
 */
const updatePass = async (req, res) => {
  const { token, currentPass, newPassword } = req.body

  try {
    const { id } = await jwt.decode(token, process.env.JWT_SECRET)

    if (!id) {
      throw new Error('Token invalid!')
    }
    const response = await pool.query(
      'SELECT password FROM logins WHERE id = $1',
      [id],
    )

    if (response.rowCount === 0) {
      throw new Error('Invalid data!')
    }

    const password = await bcrypt.compare(
      currentPass,
      response.rows[0].password,
    )

    if (!password) {
      throw new Error('Wrong current password!')
    }

    const hashPassword = await bcrypt.hash(newPassword, 7)

    const updatePassword = await pool.query(
      'UPDATE logins SET password = $1 WHERE id = $2 RETURNING *',
      [hashPassword, id],
    )

    res.send(updatePassword)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = updatePass
