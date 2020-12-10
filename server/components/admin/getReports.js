const pool = require('../../config/db')

/**
 * @GET
 * Device API
 *
 * @readonly
 */
const getReports = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM reports')

    res.send(response.rows)
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = getReports
