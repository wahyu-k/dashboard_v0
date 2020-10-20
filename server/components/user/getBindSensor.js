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
    const primary_dev_id = device.rows[0].primary_dev_id

    if (time === 0) {
      // const view = await pool.query(
      //   'SELECT * from sensors WHERE device_id = ANY($1::BIGINT[]) ORDER BY created_at DESC',
      //   [device_id],
      // )
      const view = await pool.query(
        'SELECT * from bills WHERE payment = 0 AND device_id = ANY($1::BIGINT[])',
        [device_id],
      )
      const primary = await pool.query(
        'SELECT * FROM sensors WHERE device_id = $1 ORDER BY created_at DESC',
        [primary_dev_id],
      )
      const bill = await pool.query(
        'SELECT sum(daily_bill) - SUM(payment) AS bill FROM bills WHERE device_id = ANY($1::BIGINT[])',
        [device_id],
      )
      const price = await pool.query(
        'SELECT price FROM prices WHERE $1 = ANY(device_id_list)',
        [device_id[0]],
      )
      res.json({
        local: view.rows,
        primary: primary.rows,
        daily_flow: bill.rows[0].daily_flow,
        bill: bill.rows[0].bill,
        price: price.rows[0].price,
      })
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
