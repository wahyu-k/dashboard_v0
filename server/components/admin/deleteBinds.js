const pool = require('../../config/db')

/**
 * @PUT
 * BINDS API
 */

const deleteBinds = async (req, res) => {
  const { user_id } = req.body

  try {
    const response = await pool.query(
      'DELETE FROM binds WHERE user_id = $1 RETURNING *',
      [user_id],
    )
    res.send(response.rows)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = deleteBinds
