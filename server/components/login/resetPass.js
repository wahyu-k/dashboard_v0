const pool = require('../../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/**
 * @POST
 * Reset Password API
 *
 * @requires
 *  @token - token from the email that contains the email (exp in 2 hour)
 *  @newPassword - the new password
 */
const resetPass = async (req, res) => {
  const { token, newPassword } = req.body

  try {
    const { email } = await jwt.decode(token, process.env.JWT_SECRET)

    if (!email) {
      throw new Error('Failed!')
    }

    const password = await bcrypt.hash(newPassword, 7)

    const response = await pool.query(
      'UPDATE logins SET password = $1, modified_at = $2 WHERE email = $3 RETURNING *',
      [password, Date.now(), email],
    )

    res.send(response.rows)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = resetPass
