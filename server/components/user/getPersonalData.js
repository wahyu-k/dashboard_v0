const pool = require('../../config/db')
const jwt = require('jsonwebtoken')

const getPersonalData = async (req, res) => {
  const { token } = req.body

  try {
    const decodedToken = await jwt.decode(token, process.env.JWT_AUTH)

    if (!decodedToken) {
      throw new Error('Who are you?')
    }

    const id = decodedToken.id

    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id])

    res.send(response.rows[0])
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = getPersonalData
