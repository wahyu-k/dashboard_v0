const pool = require('../../config/db')

const getBill = async (req, res) => {
  const { device_id } = req.query

  try {
    const { id, username } = req.session

    let query = 'SELECT * FROM bills WHERE device_id = $1'
    let queryData = [device_id]

    if (username === 'admin') {
      query = 'SELECT * FROM bills'
      queryData = null
    }

    const response = await pool.query(query, queryData)

    res.send(response.rows)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

module.exports = getBill
