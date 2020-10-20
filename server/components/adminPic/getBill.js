const pool = require('../../config/db')

const getBill = async (req, res) => {
  const { id, plan } = req.session

  try {
    if (plan !== 2) {
      throw new Error('Unauthorized')
    }

    const device = await pool.query('SELECT * from binds WHERE user_id = $1', [
      id,
    ])
    const device_id = device.rows[0].device_id

    const response = await pool.query(
      'SELECT * FROM bills WHERE device_id = ANY($1::BIGINT[])',
      [device_id],
    )

    res.send(response.rows)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

//select * from bills where device_id = any(array(select device_id from binds where user_id = 4));

module.exports = getBill
