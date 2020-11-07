const pool = require('../../config/db')

/**
 * @GET
 * Users API
 *
 * @readonly
 */
const getUsers = async (_req, res) => {
  try {
    const response = await pool.query(
      'SELECT logins.id, logins.username, logins.email, users.plan, users.created_at FROM logins INNER JOIN users ON users.id = logins.id',
    )

    res.send(response.rows)
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = getUsers
