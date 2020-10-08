/**
 * PUT CALC API
 */
const pool = require('../../config/db')

const calcPut = async (req, res) => {
  try {
    const { x, y, z } = req.body
    const edit = await pool.query(
      'UPDATE calcs SET x = $1, y = $2,z = $3 WHERE id =$4 RETURNING *',
      [x, y, z, 1],
    )
    if (edit.rowCount === 0) {
      throw new Error('Update Error')
    }
    res.json('Update Successful')
  } catch (err) {
    res.status(400).send(err.message)
  }
}

module.exports = calcPut
