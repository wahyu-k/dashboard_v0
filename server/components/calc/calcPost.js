/**
 * POST CALC API
 */
const pool = require('../../config/db')

const calcPost = async (req, res) => {
  try {
    const { x, y, z, updated_date } = req.body
    const insert = await pool.query(
      'INSERT INTO calcs (x, y, z, updated_date) VALUES($1,$2,$3,$4) RETURNING *',
      [x, y, z, Date.now()],
    )
    res.json(insert.rows[0])
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = calcPost
