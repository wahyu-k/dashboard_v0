const pool = require('../../config/db')

const updatePersData = async (req, res) => {
  const { id } = req.session
  const { first_name, last_name, dob, prov, region } = req.body

  try {
    const response = await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2, dob = $3, prov = $4, region = $5, modified_at = $6 WHERE id = $7 RETURNING *',
      [first_name, last_name, dob, prov, region, Date.now(), id],
    )

    res.send(response.rows)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = updatePersData
