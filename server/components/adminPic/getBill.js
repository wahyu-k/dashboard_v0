const pool = require('../../config/db')

const getBill = async (req, res) => {
  const { id, plan } = req.session

  try {
    if (plan !== 2) {
      throw new Error('Unauthorized')
    }

    // const response = await pool.query(
    //   'SELECT * FROM bills WHERE device_id = ANY(ARRAY(SELECT device_id from binds WHERE user_id = $1))',
    //   [id],
    // )

    // const user = await pool.query('SELECT * FROM binds WHERE user_id = $1', [
    //   id,
    // ])

    const resp = await pool.query(
      `SELECT 
      u.id, 
      users.first_name, 
      users.last_name, 
      u.user_id, 
      u.dev_id, 
      u.daily_flow, 
      u.daily_bill, 
      u.payment, 
      u.created_at 
    FROM 
      (
        SELECT 
          bills.*, 
          bb.* 
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
              AND binds.user_id != $1
          ) AS bb 
          INNER JOIN bills ON bills.device_id = bb.dev_id
      ) AS u 
      INNER JOIN users ON users.id = u.user_id;`,
      [id],
    )

    // res.json({ bills: response.rows, users: user.rows[0].device_id })
    res.json(resp.rows)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

//select * from bills where device_id = any(array(select device_id from binds where user_id = 4));
//select users.first_name, binds.* from users join binds on users.id = any(array[binds.user_id]);
//select unnest(device_id) from binds where user_id = 4;
//select first_name from users join (select unnest(device_id) from binds where user_id = 3) as u  on u.unnest = users.id;
//select user_id from binds inner join (select unnest(device_id) as device_id from binds where user_id = 4) as u on u.device_id = binds.user_id ;

//select first_name from users inner join (select user_id from binds inner join (select unnest(device_id) as device_id from binds where user_id = 2) as u on u.device_id = binds.user_id) as uu on uu.user_id = users.id ;

//select users.first_name, u.* from (select unnest(device_id) from binds where user_id = 2) as u inner join users on u.unnest = users.id;

//select binds.user_id, b.* from (select unnest(device_id) as dev_id from binds where user_id = 4) as b inner join binds on b.dev_id = ANY(binds.device_id) and binds.user_id != 4;

//select users.first_name, bb.* from (select binds.user_id, b.* from (select unnest(device_id) as dev_id from binds where user_id = 4) as b inner join binds on b.dev_id = ANY(binds.device_id) and binds.user_id != 4) as bb inner join users on users.id = bb.user_id;

//select users.first_name, users.last_name, u.* from (select bills.id, bb.*, bills.daily_flow, bills.daily_bill, bills.payment, bills.created_at from (select binds.user_id, b.* from (select unnest(device_id) as dev_id from binds where user_id = 4) as b inner join binds on b.dev_id = ANY(binds.device_id) and binds.user_id != 4) as bb inner join bills on bills.device_id = bb.dev_id) as u inner join users on users.id = u.user_id;

module.exports = getBill
