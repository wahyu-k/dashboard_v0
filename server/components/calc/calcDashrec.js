/**
 * GET CALC DASHBOARD RECORD API
 */
const pool = require('../../config/db')

const calcDashrec = async (req, res) => {
  try {
    const { device_id } = req.body
    const view = await pool.query(
      'SELECT * FROM sensors WHERE device_id = $1',
      [device_id],
    )
    res.json(view.rows)
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = calcDashrec
