/**
 * PUT CALC API
 */
const pool = require('../../config/db')

const calcPut = async (req, res) => {
  try {
    const { x, y, z } = req.body
    const edit = await pool.query(
      'UPDATE calcs SET x = $1, y = $2,z = $3 WHERE id =$4',
      [x, y, z, 3],
    )
    res.json('Update Successful')
  } catch (err) {
    res.status(400).send(err.message)
  }
}

module.exports = calcPut
