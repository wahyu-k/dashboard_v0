const pool = require('../../config/db')

/**
 * @POST
 * BINDS API
 * @requires
 *  @user_id - user id
 *  @device_id - dev id
 */
const binds = async (req, res) => {
  try {
    const { user_id, device_id } = req.body
    const device_id_list = JSON.parse('[' + device_id + ']')
    const response = await pool.query(
      'INSERT INTO binds (user_id, device_id) VALUES ($1, $2) RETURNING *',
      [user_id, device_id_list],
    )
    res.send(response.rows)
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = binds
