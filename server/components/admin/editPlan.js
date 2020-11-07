const pool = require('../../config/db')

const editPlan = async (req, res) => {
  const { user_id, plan } = req.body

  try {
    const response = await pool.query(
      'UPDATE users SET plan = $1 WHERE id = $2 RETURNING *',
      [plan, user_id],
    )
    res.send(response.rows)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = editPlan
