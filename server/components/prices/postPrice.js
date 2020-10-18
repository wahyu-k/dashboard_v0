const pool = require('../../config/db')

const postPrice = async (req, res) => {
  const { price, device_id_list } = req.body

  try {
    const array = JSON.parse('[' + device_id_list + ']')
    const response = await pool.query(
      'INSERT INTO prices (price, device_id_list, created_at, modified_at) VALUES($1, $2, $3, $4) RETURNING *',
      [price, array, Date.now(), Date.now()],
    )

    res.send(response.rows)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

module.exports = postPrice
