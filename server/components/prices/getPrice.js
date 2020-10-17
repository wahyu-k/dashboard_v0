const pool = require('../../config/db')

const getPrice = async (req, res) => {
  const { id, username } = req.session

  try {
    if (username !== 'admin') {
      res.sendStatus(401)
    }

    const response = await pool.query('SELECT * FROM prices')

    res.send(response.rows)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

module.exports = getPrice
