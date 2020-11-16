/**
Keluhan RECORD API
 */
const pool = require('../../config/db')

const keluhan = async (req, res) => {
  try {
    const { check1, check2, check3, check4, check5 } = req.body
    // const { c } = req.body
    const view = await pool.query(
      'select distinct solution from simplesol where checked = $1 OR checked = $2 OR checked = $3 OR checked = $4 OR checked = $5 order by solution',
      // 'SELECT * FROM simplesol WHERE checked = $1',
      // [c],
      [check1, check2, check3, check4, check5],
    )
    res.json(view.rows)
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = keluhan
