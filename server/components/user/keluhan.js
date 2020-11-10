/**
Keluhan RECORD API
 */
const pool = require('../../config/db')

const keluhan = async (req, res) => {
  try {
    const { checked } = req.body
    const view = await pool.query(
      'SELECT * FROM simplesol WHERE checked = $1',
      [checked],
    )
    res.json(view.rows[0])
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = keluhan
