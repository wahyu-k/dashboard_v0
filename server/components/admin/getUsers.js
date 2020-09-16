const pool = require('../../config/db')

/**
 * @GET
 * Users API
 *
 * @readonly
 */
const getUsers = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM logins')

    res.send(response.rows)
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = getUsers
