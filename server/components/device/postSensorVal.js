const pool = require('../../config/db')

/**
 * @POST
 * Posting the sensors data
 *
 * @requires
 *  @ph - the ph value
 *  @tds - the tds value
 *  @turb - the turbidity value
 *  @temp - the temperature value
 *  @flow - the flow value
 *  @device_id - the device id
 */
const postSensorVal = async (req, res) => {
  const { ph, tds, turb, temp, flow, device_id } = req.body

  try {
    const response = await pool.query(
      'INSERT INTO sensors(ph, tds, turb, temp, flow, device_id, created_at, modified_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [ph, tds, turb, temp, flow, device_id, Date.now(), Date.now()],
    )

    res.send(response.rows)
  } catch (error) {
    res.send(error)
    console.error(error)
  }
}

module.exports = postSensorVal
