const pool = require('../../config/db')

const postBill = async (req, res) => {
  const { device_id, daily_flow, payment } = req.body

  try {
    const response_price = await pool.query(
      'SELECT price FROM prices WHERE $1 = ANY(device_id_list)',
      [device_id],
    )

    if (response_price.rowCount === 0) {
      throw new Error('No price found on the device id')
    }

    const price = response_price.rows[0].price

    const dailyBill = daily_flow * price

    const response = await pool.query(
      'INSERT INTO bills (device_id, daily_flow, daily_bill, payment, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [device_id, daily_flow, dailyBill, payment, Date.now()],
    )

    res.send(response.rows)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

module.exports = postBill
