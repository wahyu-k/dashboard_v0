const pool = require('../../config/db')

const postBill = async (req, res) => {
  const { plan } = req.session
  const { device_id, payment } = req.body

  try {
    if (plan !== 2) {
      throw new Error('Unauthorized')
    }

    const response = await pool.query(
      'INSERT INTO bills (device_id, payment, created_at) VALUES($1, $2, $3) RETURNING *',
      [device_id, payment, Date.now()],
    )

    res.send(response.rows)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

module.exports = postBill
