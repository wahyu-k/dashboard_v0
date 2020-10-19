const jwt = require('jsonwebtoken')

exports.start = async (req, res, next) => {
  const authHeader = await req.headers['authorization']
  if (authHeader === undefined) return res.sendStatus(401)

  let token = null

  try {
    token = authHeader.split(' ')[1]
  } catch (error) {
    return res.sendStatus(400)
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, session) => {
    if (err) {
      return res.sendStatus(401)
    } else {
      req.session = session
      next()
    }
  })
}
