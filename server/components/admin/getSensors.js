const pool = require('../../config/db')

/**
 * @POST
 * Sensors API
 *
 * @requires
 *  @time - select based on created_at
 */

const getSensors = async (req, res) => {
  try {
    const { device_id, time } = req.body
    if (time === 0) {
      const response = await pool.query(
        'SELECT * FROM sensors ORDER BY created_at DESC',
      )
      res.json(response.rows)
    } else {
      const response = await pool.query(
        'SELECT * FROM sensors WHERE created_at >= (ROUND(EXTRACT(EPOCH FROM NOW()) * 1000) - $1) ORDER BY created_at DESC',
        [time],
      )
      res.json(response.rows)
    }
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = getSensors