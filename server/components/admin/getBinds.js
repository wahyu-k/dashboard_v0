const pool = require('../../config/db')

/**
 * @GET
 * BINDS API
 */

const getBinds = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM binds ORDER BY user_id')
    res.send(response.rows)
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = getBinds
