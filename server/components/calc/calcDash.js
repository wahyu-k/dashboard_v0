/**
 * GET CALC DASHBOARD API
 */
const pool = require('../../config/db')

const calcDash = async (req, res) => {
  try {
    const view = await pool.query(
      'SELECT * FROM sensors WHERE created_at=(SELECT MAX(created_at) FROM sensors)',
    )
    res.json(view.rows[0])
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = calcDash
