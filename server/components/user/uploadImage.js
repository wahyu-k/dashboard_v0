/**
POST UPLOAD IMG RECORD API
 */
const pool = require('../../config/db')

const uploadImage = async (req, res) => {
  try {
    const { imgname, img } = req.body
    const view = await pool.query(
      'INSERT INTO images(imgname, img) VALUES($1,$2) RETURNING *',
      [imgname, img],
    )
    res.json(view.rows)
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = uploadImage
