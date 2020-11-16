const express = require('express')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const multer = require('multer')
const path = require('path')
const url = require('url')

const s3 = new aws.S3({
  accessKeyId: 'AKIAXJRA2B7AQOMFSQ6H',
  secretAccessKey: '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',
  bucket: 'upload-siab',
})

/**
 * Single Upload
 */
const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'upload-siab',
    acl: 'public-read',
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
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).single('profileImage')

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
  // Allowed ext
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
}

const imageUpload = (req, res) => {
  profileImgUpload(req, res, (error) => {
    if (error) {
      console.log('errors', error)
      res.json({ error: error })
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log('Error: No File Selected!')
        res.json('Error: No File Selected')
      } else {
        // If Success
        const imageName = req.file.key
        const imageLocation = req.file.location

        res.json({
          image: imageName,
          location: imageLocation,
        })
      }
    }
  })
}

module.exports = imageUpload
