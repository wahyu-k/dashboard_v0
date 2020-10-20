/**
 * GET LANDING PAGE API
 */
const pool = require('../../config/db')

const getLandingPage = async (req, res) => {
  try {
    const view = await pool.query('SELECT * FROM dash')
    res.json(view.rows)
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = getLandingPage
