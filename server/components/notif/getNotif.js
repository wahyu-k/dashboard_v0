const pool = require('../../config/db')

const getNotif = async (req, res) => {
  const { id, plan } = req.session

  try {
    if (plan !== 2) {
      throw new Error('Unauthorized')
    }

    const response = await pool.query(
      `SELECT
      u.id,
      users.first_name,
      users.last_name,
      u.user_id,
      u.dev_id,
      u.msg,
      u.prevent,
      u.prevent_msg,
      u.created_at
    FROM
      (
        SELECT
          *
        FROM
          (
            SELECT
              binds.user_id,
              b.*
            FROM
              (
                SELECT
                  UNNEST(device_id) AS dev_id
                FROM
                  binds
                WHERE
                  user_id = $1
              ) AS b
              INNER JOIN binds ON b.dev_id = ANY(binds.device_id)
              and binds.user_id != $1
          ) AS b
          INNER JOIN notifs ON b.dev_id = notifs.device_id
      ) AS u
      INNER JOIN users ON users.id = u.user_id`,
      [id],
    )

    if (response) {
      res.send(response.rows)
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = getNotif
