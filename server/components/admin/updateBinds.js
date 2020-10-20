const pool = require('../../config/db')

/**
 * @PUT
 * BINDS API
 */

const updateBinds = async (req, res) => {
  const { user_id, device_id } = req.body

  try {
    const device_id_list = JSON.parse('[' + device_id + ']')
    const response = await pool.query(
      'UPDATE binds SET device_id = $1 WHERE user_id = $2 RETURNING *',
      [device_id_list, user_id],
    )
    res.send(response.rows)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = updateBinds
