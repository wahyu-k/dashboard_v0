const pool = require('../../config/db')

const getPersonalData = async (req, res) => {
  const { id } = req.session

  try {
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id])

    res.send(response.rows[0])
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = getPersonalData
