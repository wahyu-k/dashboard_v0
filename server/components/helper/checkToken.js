const pool = require('../../config/db')
const jwt = require('jsonwebtoken')

/**
 * @POST
 * Check Token API
 *
 * @requires
 *  @token - token from the local storage
 */
const checkToken = async (req, res) => {
  const { token } = req.body
  try {
    const { username } = await jwt.decode(token, process.env.JWT_SECRET)

    if (!username) {
      throw new Error('Failed token!')
    }

    const response = await pool.query(
      'SELECT logins.*, users.plan FROM logins INNER JOIN users ON logins.id = users.id WHERE logins.username = $1',
      [username],
    )

    if (response.rowCount !== 0) {
      res.send(response.rows[0])
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = checkToken
