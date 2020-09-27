const pool = require('../../config/db')

/**
 * @POST
 * Posting data
 *
 * @requires
 *  @name - the device name
 *  @lng - the longitude
 *  @lat - the latitude
 *  @user_id - user id
 */
const addDevice = async (req, res) => {
  const { name, lng, lat, user_id } = req.body

  try {
    const isUserId = await pool.query('SELECT id FROM logins WHERE id = $1', [
      user_id,
    ])

    if (isUserId.rowCount === 0) {
      throw new Error('No user exist!')
    }

    const response = await pool.query(
      'INSERT INTO devices(name, lng, lat, user_id, created_at, modified_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, lng, lat, user_id, Date.now(), Date.now()],
    )

    res.send(response.rows)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

module.exports = addDevice
