const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'mail.siagaairbersih.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'no-reply@siagaairbersih.com', // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
})

module.exports = transporter
