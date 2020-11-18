/**
Keluhan RECORD API
 */
const pool = require('../../config/db')

const keluhan = async (req, res) => {
  try {
    const { check1, check2, check3, check4 } = req.body
    const view = await pool.query(
      'SELECT DISTINCT solution FROM simplesol WHERE checked = $1 OR checked = $2 OR checked = $3 OR checked = $4 ORDER BY solution',
      [check1, check2, check3, check4],
    )
    res.json(view.rows)
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = keluhan
