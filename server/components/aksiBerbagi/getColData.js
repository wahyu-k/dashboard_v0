const pool = require('../../config/db')

const getColData = async (req, res) => {
  const { device_id } = req.body

  try {
    const response = await pool.query(
      'SELECT devices.id, devices.name, devices.lat, devices.lng, SUM(sensors.flow) as total_flow FROM sensors INNER JOIN devices ON (sensors.device_id = devices.id) WHERE sensors.device_id = ANY($1::int[]) GROUP BY devices.id;',
      [device_id],
    )

    const result = response.rows
    console.log(result)
    res.send(result)
  } catch (error) {
    res.send(error)
    console.error(error)
  }
}

module.exports = getColData
