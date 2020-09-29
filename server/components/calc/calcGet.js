/**
 * GET CALC API
 */
const pool = require('../../config/db')

const calcGet = async (req, res) => {
  try {
    const view = await pool.query('SELECT * FROM calcs')
    res.json(view.rows[0])
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = calcGet
