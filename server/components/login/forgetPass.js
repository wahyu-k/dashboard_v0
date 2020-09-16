const pool = require('../../config/db')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
// const mail = require('./config/mail')

/**
 * @POST
 * Forget Password API
 *
 * @requires
 *  @receiver - the receiver's email
 */
const forgetPass = async (req, res) => {
  const { receiver } = req.body

  try {
    const response = await pool.query('SELECT * FROM logins WHERE email = $1', [
      receiver,
    ])

    if (response.rowCount === 0) {
      throw new Error("Can't find the email!")
    }

    const testAccount = await nodemailer.createTestAccount()

    // create reusable transporter object using the default SMTP transport
    const mail = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    })

    const jwtAuth = await jwt.sign(
      { email: receiver },
      process.env.JWT_SECRET,
      {
        expiresIn: '2h',
      },
    )

    const info = await mail.sendMail({
      from: '"Siaga Air Bersih" <no-reply@siagaairbersih.com>', // sender address
      to: receiver, // list of receivers
      subject: 'Password Reset', // Subject line
      html: `<p>Here is the link to reset your password<p>
             <br />
             <a>localhost:3000/reset_password/${jwtAuth}</a>`, // html body
    })

    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

    if (info.messageId) {
      // res.send(info.messageId)
      res.send(nodemailer.getTestMessageUrl(info))
    } else {
      throw new Error('Not Send!')
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = forgetPass
