const pool = require('../../config/db')

const postNotif = async (req, res) => {
  const { device_id, msg } = req.body

  try {
    const response = await pool.query(
      'INSERT INTO notif(device_id, msg, prevent, prevent_msg, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [device_id, msg, false, '', Date.now()],
    )

    if (response) {
      res.send(response.rows)
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = postNotif
