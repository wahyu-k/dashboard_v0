const pool = require('../../config/db')

/**
 * @GET
 * Device API
 *
 * @readonly
 */
const getDevices = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM devices')

    res.send(response.rows)
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = getDevices
