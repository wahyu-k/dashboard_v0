const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
// const uuid = require('uuid/v4')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const config = require('./config')

aws.config.update = config.awsConfig

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'upload-siab',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          '-' +
          Date.now() +
          path.extname(file.originalname),
      )
    },
  }),
})

const singleFileUpload = upload.single('image')
function uploadToS3() {
  const filetypes = /jpeg|jpg|png|gif/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
  req.s3Key = uuid()
  let downloadUrl = `https://s3.${config.awsConfig.region}.amazonaws.com/upload-siab/${req.s3Key}`
  return new Promise((resolve, reject) => {
    return singleFileUpload(req, res, (err) => {
      if (err) return reject(err)
      return resolve()
    })
  })
}

module.exports = {
  uploadImageToS3: (req, res) => {
    uploadToS3(req, res)
      .then((downloadUrl) => {
        console.log(downloadUrl)
        // db.update({
        //   Tablename: 'users',
        //   id:userId,
        //   profileThumbnailUrl: downloadUrl
        // })
        // .then(()=> res.status(200).send({ downloadUrl}))
        return res.status(200).send({ downloadUrl })
      })
      .catch((e) => {
        console.log('e', e)
      })
  },
}
