const pool = require('../../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Joi = require('joi')

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

    const schema = Joi.object({
      newPassword: Joi.string().min(8).max(100),
    })

    const validate = schema.validate({ newPassword })

    if (validate.error) {
      throw new Error(validate.error)
    }

    const hashPassword = await bcrypt.hash(newPassword, 7)

    const updatePassword = await pool.query(
      'UPDATE logins SET password = $1, modified_at = $2 WHERE id = $3 RETURNING *',
      [hashPassword, Date.now(), id],
    )

    res.send(updatePassword)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = updatePass
