/**
 * GET BINDS API
 */
const pool = require('../../config/db')

const getBinds = async (req, res) => {
  const userId = 2
  try {
    const device = await pool.query('SELECT * from binds WHERE user_id=$1', [
      userId,
    ])
    const a = device.rows[0].device_id
    console.log('device', device.rows[0].device_id)
    const view = await pool.query(
      'SELECT * from sensors WHERE device_id = ANY($1::BIGINT[])',
      [a],
    )
    res.json(view.rows)
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = getBinds
