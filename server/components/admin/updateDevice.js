const pool = require('../../config/db')

const updateDevice = async (req, res) => {
  const { id, name, lat, lng } = req.body

  try {
    const response = await pool.query(
      'UPDATE devices SET name = $1, lat = $2, lng = $3, modified_at = $4 WHERE id = $5 RETURNING *',
      [name, lat, lng, Date.now(), id],
    )

    res.send(response.rows)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = updateDevice
