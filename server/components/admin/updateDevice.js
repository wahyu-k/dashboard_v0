const pool = require('../../config/db')

const updateDevice = async (req, res) => {
  const { id, name, lat, lng, user_id } = req.body

  try {
    const isUserId = await pool.query('SELECT * FROM logins WHERE id = $1', [
      user_id,
    ])

    if (isUserId.rowCount === 0) {
      throw new Error('No User Id found!')
    }

    const response = await pool.query(
      'UPDATE devices SET name = $1, lat = $2, lng = $3, user_id = $4 WHERE id = $5 RETURNING *',
      [name, lat, lng, user_id, id],
    )

    res.send(response.rows)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = updateDevice
