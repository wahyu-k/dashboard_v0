/**
 * GET BINDS API
 */
const pool = require('../../config/db')

const getBinds = async (req, res) => {
  const time = parseInt(req.query.time)

  const user_id = req.session.id

  try {
    const device = await pool.query('SELECT * from binds WHERE user_id = $1', [
      user_id,
    ])

    const device_id = device.rows[0].device_id

    if (time === 0) {
      const view = await pool.query(
        'SELECT * from sensors WHERE device_id = ANY($1::BIGINT[]) ORDER BY created_at DESC',
        [device_id],
      )
      res.json(view.rows)
    } else {
      const view = await pool.query(
        'SELECT * FROM sensors WHERE device_id = ANY($1::BIGINT[]) AND created_at >= (ROUND(EXTRACT(EPOCH FROM NOW()) * 1000) - $2) ORDER BY created_at DESC',
        [device_id, 0],
      )
      res.json(view.rows)
    }
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = getBinds
