/**
 * FILTER DATA DASHBOARD API
 */
const pool = require('../../config/db')

const filter = async (req, res) => {
  try {
    const { device_id } = req.body
    const view = await pool.query(
      'SELECT * FROM sensors WHERE device_id = $1 AND created_at > (ROUND(EXTRACT(EPOCH FROM NOW()) * 1000) -86400000)',
      [device_id],
    )
    res.json(view.rows)
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = filter
