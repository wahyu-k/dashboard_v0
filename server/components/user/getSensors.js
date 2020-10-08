/**
 * GET SENSORS RECORD API
 */
const pool = require('../../config/db')

const getSensors = async (req, res) => {
  try {
    const { device_id, time } = req.body
    if (time === 0) {
      const view = await pool.query(
        'SELECT * FROM sensors WHERE device_id = $1 ORDER BY created_at DESC',
        [device_id],
      )
      res.json(view.rows)
    } else {
      const view = await pool.query(
        'SELECT * FROM sensors WHERE device_id = $1 AND created_at >= (ROUND(EXTRACT(EPOCH FROM NOW()) * 1000) - $2) ORDER BY created_at DESC',
        [device_id, time],
      )
      res.json(view.rows)
    }
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = getSensors
