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
  const { name, lng, lat } = req.body

  try {
    const response = await pool.query(
      'INSERT INTO devices(name, lng, lat, created_at, modified_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, lng, lat, Date.now(), Date.now()],
    )

    res.send(response.rows)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

module.exports = addDevice
