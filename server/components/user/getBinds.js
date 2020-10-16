/**
 * GET BINDS API
 */
const pool = require('../../config/db')

const getBinds = async (req, res) => {
  try {
    const view = await pool.query('SELECT * from binds WHERE user_id=2')
    res.json(view.rows)
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = getBinds
