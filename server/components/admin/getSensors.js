const pool = require('../../config/db')

/**
 * @GET
 * Sensors API
 *
 * @readonly
 */
const getSensors = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM sensors')

    res.send(response.rows)
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = getSensors
