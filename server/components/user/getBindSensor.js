/**
 * GET BINDS API
 */
const pool = require('../../config/db')

const getBinds = async (req, res) => {
  const { user_id } = req.query

  try {
    const device = await pool.query('SELECT * from binds WHERE user_id=$1', [
      user_id,
    ])

    const device_id = device.rows[0].device_id

    const view = await pool.query(
      'SELECT * from sensors WHERE device_id = ANY($1::BIGINT[])',
      [device_id],
    )
    res.json(view.rows)
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = getBinds
